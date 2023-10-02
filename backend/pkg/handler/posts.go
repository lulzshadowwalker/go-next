package handler

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/go-playground/validator"
	"github.com/lulzshadowwalker/go-next/pkg/model"
	"github.com/lulzshadowwalker/go-next/pkg/repo"
	"github.com/lulzshadowwalker/go-next/pkg/utils"
)

type Posts struct {
	Repo PostsRepo
}

type PostsRepo interface {
	Index() ([]model.Post, error)
	Create(model.CreateRequestPost) error
}

func (p *Posts) Index(w http.ResponseWriter, r *http.Request) error {
	res, err := p.Repo.Index()
	if err != nil {
		return err
	}

	return WriteJson(w, http.StatusOK, map[string]any{
		"data": res,
	})
}

func (p *Posts) Create(w http.ResponseWriter, r *http.Request) error {
	tok := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
	err := validate.Var(tok, "required")
	if err != nil {
		return utils.NewApiErr(http.StatusUnauthorized, map[string]any{
			"message": "Bearer Token is required",
		})
	}

	claims, err := repo.ParseAccessToken(tok)
	if err != nil {
		return err
	}

	authorId, err := strconv.Atoi(claims.Subject)
	if err != nil {
		return fmt.Errorf("cannot parse author id from claism %w", err)
	}
	title, body, coverPic := r.PostFormValue("title"), r.PostFormValue("body"), r.PostFormValue("cover_picture")

	post := model.CreateRequestPost{
		Author:       authorId,
		Title:        title,
		Body:         body,
		CoverPicture: coverPic,
	}

	errs := validate.Struct(post).(validator.ValidationErrors)
	if errs != nil {
		return WriteJson(w, http.StatusBadRequest, map[string]any{
			"message": "validation errors",
			"errors":  generateValidationMessage(errs),
		})
	}

	err = p.Repo.Create(post)
	if err != nil {
		return err
	}

	return WriteJson(w, http.StatusOK, map[string]any{
		"message": "post created successfully",
	})
}
