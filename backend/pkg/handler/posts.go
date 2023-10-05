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
	Index() ([]model.PostResponse, error)
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
	err := r.ParseMultipartForm(4048 * 4048)
	if err != nil {
		return utils.NewApiErr(http.StatusRequestEntityTooLarge, map[string]any{
			"message": "request too large pepega",
		})
	}

	tok := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
	err = validate.Var(tok, "required")
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

	title, body := r.PostFormValue("title"), r.PostFormValue("body")

	var coverPic string
	_, _, err = r.FormFile("cover_picture")
	if err == nil {
		coverPic, err = StoreFile(w, r, "cover_picture")
		if err != nil {
			return fmt.Errorf("cannot store profile picture %w", err)
		}
	}

	post := model.CreateRequestPost{
		Author:       authorId,
		Title:        title,
		Body:         body,
		CoverPicture: coverPic,
	}

	err = validate.Struct(post)
	if err != nil {
		if errs := err.(validator.ValidationErrors); errs != nil {
			return WriteJson(w, http.StatusBadRequest, map[string]any{
				"message": "validation errors",
				"errors":  generateValidationMessage(errs),
			})
		}
	}

	err = p.Repo.Create(post)
	if err != nil {
		return err
	}

	return WriteJson(w, http.StatusOK, map[string]any{
		"message": "post created successfully",
	})
}
