package model

type Post struct {
	Id           int    `json:"id"`
	Author       int    `json:"author"`
	Title        string `json:"title"`
	Body         string `json:"body"`
	CoverPicture string `json:"cover_picture"`
}

type CreateRequestPost struct {
	Author       int    `validate:"required"`
	Title        string `validate:"required"`
	Body         string `validate:"required"`
	CoverPicture string `validate:"url"`
}
