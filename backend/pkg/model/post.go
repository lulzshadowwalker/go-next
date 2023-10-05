package model

import (
	"time"
)

type Post struct {
	Id           int       `json:"id,omitempty"`
	Author       int       `json:"author"`
	Title        string    `json:"title"`
	Body         string    `json:"body"`
	CoverPicture string    `json:"cover_picture"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

type CreateRequestPost struct {
	Author       int    `validate:"required"`
	Title        string `validate:"required"`
	Body         string `validate:"required"`
	CoverPicture string
}

type PostResponse struct {
	Post
	Author User `json:"author"`
}
