package repo

import (
	"database/sql"
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/golang-jwt/jwt"
	"github.com/lulzshadowwalker/go-next/pkg/model"
	"github.com/lulzshadowwalker/go-next/pkg/utils"
	"golang.org/x/crypto/bcrypt"
)

type AuthRepo repo

type Token struct {
	jwt.StandardClaims
}

func (r *AuthRepo) Register(u model.User) (user *model.User, token string, err error) {
	trans, err := r.Db.Begin()
	if err != nil {
		return nil, "", fmt.Errorf("cannot register user %w\n", err)
	}

	pwd, err := bcrypt.GenerateFromPassword([]byte(u.Password), 8)
	if err != nil {
		return nil, "", fmt.Errorf("cannot register a new user %w\n", err)
	}

	_, err = trans.Exec(`
		INSERT INTO users(name, email, password, profile_picture)
		VALUES (?, ?, ?, ?);
	`, u.Name, u.Email, pwd, u.ProfilePicture)
	if err != nil {
		trans.Rollback()
		return nil, "", utils.NewApiErr(http.StatusConflict, "user already exists")
	}

	user = new(model.User)
	var mbPfp sql.NullString
	err = trans.QueryRow(`
		SELECT  name, email, profile_picture
		FROM users
		WHERE email = ?;
	`, u.Email).Scan(&user.Name, &user.Email, &mbPfp)
	if err != nil {
		trans.Rollback()
		return nil, "", fmt.Errorf("cannot retreive user record %w\n", err)
	}

	if mbPfp.Valid {
		user.ProfilePicture = mbPfp.String
	}

	token, err = generateAccessToken(user.Id)
	if err != nil {
		trans.Rollback()
		return nil, "", err
	}

	trans.Commit()

	return user, token, nil
}

func (r *AuthRepo) Login(email, password string) (user *model.User, token string, err error) {
	user = new(model.User)

	var storedHash string
	var mbPfp sql.NullString
	err = r.Db.QueryRow(`
		SELECT name, email, profile_picture, password
		FROM users
		WHERE email = ?;
	`, email).Scan(&user.Name, &user.Email, &mbPfp, &storedHash)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, "", utils.NewApiErr(http.StatusNotFound, "user not found")
		}

		return nil, "", fmt.Errorf("cannot retreive user record %w\n", err)
	}

	if mbPfp.Valid {
		user.ProfilePicture = mbPfp.String
	}

	err = bcrypt.CompareHashAndPassword([]byte(storedHash), []byte(password))
	if err != nil {
		return nil, "", utils.NewApiErr(http.StatusUnauthorized, "invalid credentials")
	}

	token, err = generateAccessToken(user.Id)
	if err != nil {
		return nil, "", err
	}

	return user, token, nil
}

func generateAccessToken(userId int) (string, error) {
	tok := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Subject: strconv.Itoa(userId),
	})

	tokenString, err := tok.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return "", fmt.Errorf("cannot create access token %w\n", err)
	}

	return tokenString, nil
}

func ParseAccessToken(t string) (*Token, error) {
	tok, err := jwt.ParseWithClaims(t, &Token{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})
	if err != nil {
		return nil, utils.NewApiErr(http.StatusUnauthorized, "invalid access token")
	}

	if claims, ok := tok.Claims.(*Token); !ok || !tok.Valid {
		return nil, utils.NewApiErr(http.StatusUnauthorized, "invalid access token")
	} else {
		return claims, nil
	}
}
