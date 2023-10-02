package repo

import (
	"database/sql"
	"fmt"

	"github.com/lulzshadowwalker/go-next/pkg/model"
)

type PostsRepo repo

func (r *PostsRepo) Index() ([]model.Post, error) {
	rows, err := r.Db.Query(`
		SELECT id, author, title, body, cover_picture FROM posts;
	`)
	if err != nil {
		return nil, fmt.Errorf("cannot fetch posts from db %w\n", err)
	}

	var posts []model.Post
	for rows.Next() {
		p := new(model.Post)
		var mbCoverPic sql.NullString
		err := rows.Scan(&p.Id, &p.Author, &p.Title, &p.Body, &mbCoverPic)
		if err != nil {
			return nil, fmt.Errorf("cannot fetch posts from db %w\n", err)
		}

		if mbCoverPic.Valid {
			p.CoverPicture = mbCoverPic.String
		}
	}
	fmt.Println(posts)
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
