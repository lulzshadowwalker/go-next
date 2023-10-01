package repo

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/lulzshadowwalker/go-next/pkg/handler"
	"github.com/lulzshadowwalker/go-next/pkg/model"
	"golang.org/x/crypto/bcrypt"
)

type AuthRepo struct {
	Db *sql.DB
}

func (r *AuthRepo) Register(u model.User) (*model.User, error) {
	trans, err := r.Db.Begin()
	if err != nil {
		return nil, fmt.Errorf("cannot register user %q\n", err)
	}

	pwd, err := bcrypt.GenerateFromPassword([]byte(u.Password), 8)
	if err != nil {
		return nil, fmt.Errorf("cannot register a new user %q\n", err)
	}

	_, err = trans.Exec(`
		INSERT INTO users(name, email, password)
		VALUES (?, ?, ?);
	`, u.Name, u.Email, pwd)
	if err != nil {
		trans.Rollback()
		return nil, handler.NewApiErr(http.StatusConflict, "user already exists")
	}

	user := new(model.User)
	var mbPfp sql.NullString
	err = trans.QueryRow(`
		SELECT name, email, profile_picture
		FROM users
		WHERE email = ?;
	`, u.Email).Scan(&user.Name, &user.Email, &mbPfp)
	if err != nil {
		trans.Rollback()
		return nil, fmt.Errorf("cannot retreive user record %q\n", err)
	}

	if mbPfp.Valid {
		user.ProfilePicture = mbPfp.String
	}

	trans.Commit()
	return user, nil
}

func (r *AuthRepo) Login(email, password string) (*model.User, error) {
	user := new(model.User)

	var storedHash string
	var mbPfp sql.NullString
	err := r.Db.QueryRow(`
		SELECT name, email, profile_picture, password
		FROM users
		WHERE email = ?;
	`, email).Scan(&user.Name, &user.Email, &mbPfp, &storedHash)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, handler.NewApiErr(http.StatusNotFound, "user not found")
		}

		return nil, fmt.Errorf("cannot retreive user record %q\n", err)
	}

	if mbPfp.Valid {
		user.ProfilePicture = mbPfp.String
	}

	err = bcrypt.CompareHashAndPassword([]byte(storedHash), []byte(password))
	if err != nil {
		return nil, handler.NewApiErr(http.StatusUnauthorized, "invalid credentials")
	}

	return user, nil
}
