package repo

import (
	"database/sql"
	"fmt"

	"github.com/lulzshadowwalker/go-next/pkg/model"
)

type PostsRepo repo

func (r *PostsRepo) Index() ([]model.PostResponse, error) {
	rows, err := r.Db.Query(`
		SELECT P.id, P.title, P.body, P.cover_picture, P.created_at, P.updated_at, A.name, A.email, A.profile_picture 
		FROM posts P JOIN users A
		ON P.author = A.id;
	`)
	if err != nil {
		return nil, fmt.Errorf("cannot fetch posts from db %w\n", err)
	}

	var posts []model.PostResponse
	for rows.Next() {
		p := model.PostResponse{}
		var mbCoverPic sql.NullString
		var mbProfilePic sql.NullString
		err := rows.Scan(&p.Id, &p.Title, &p.Body, &mbCoverPic, &p.CreatedAt, &p.UpdatedAt, &p.Author.Name, &p.Author.Email, &mbProfilePic)
		if err != nil {
			return nil, fmt.Errorf("cannot fetch posts from db %w\n", err)
		}

		if mbCoverPic.Valid {
			p.CoverPicture = mbCoverPic.String
		}

		if mbProfilePic.Valid {
			p.Author.ProfilePicture = mbProfilePic.String
		}

		posts = append(posts, p)
	}

	return posts, nil
}

func (r *PostsRepo) Create(p model.CreateRequestPost) error {
	_, err := r.Db.Exec(`
		INSERT INTO posts(author, title, body, cover_picture)
		VALUES (?, ?, ?, ?);
	`, p.Author, p.Title, p.Body, p.CoverPicture)
	if err != nil {
		return fmt.Errorf("cannot create post %ws\n", err)
	}

	return nil
}
