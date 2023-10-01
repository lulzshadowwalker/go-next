package handler

import (
	"net/http"

	"github.com/go-playground/validator"
	"github.com/lulzshadowwalker/go-next/pkg/model"
)

type Auth struct {
	Repo AuthRepo
}

type AuthRepo interface {
	Register(model.User) (*model.User, error)
	Login(email, password string) (*model.User, error)
}

func (a *Auth) Register(w http.ResponseWriter, r *http.Request) error {
	name, email, pwd := r.PostFormValue("name"), r.PostFormValue("email"), r.PostFormValue("password")
	reqUser := model.NewRegisterRequestUser(name, email, pwd)

	err := validate.Struct(reqUser)
	if err != nil {
		return NewApiErr(http.StatusBadRequest, map[string]any{
			"message": "validation errors",
			"errors":  generateValidationMessage(err.(validator.ValidationErrors)),
		})
	}
	u := model.User{
		Name:           reqUser.Name,
		Email:          reqUser.Email,
		Password:       reqUser.Password,
		ProfilePicture: reqUser.ProfilePicture,
	}

	user, err := a.Repo.Register(u)
	if err != nil {
		return err
	}

	return WriteJson(w, http.StatusOK, map[string]any{
		"data": user,
	})
}

func (a *Auth) Login(w http.ResponseWriter, r *http.Request) error {
	email, pwd := r.PostForm.Get("email"), r.PostForm.Get("password")
	reqUser := model.NewLoginRequestUser(email, pwd)

	err := validate.Struct(reqUser)
	if err != nil {
		return NewApiErr(http.StatusBadRequest, map[string]any{
			"message": "validation errors",
			"errors":  generateValidationMessage(err.(validator.ValidationErrors)),
		})
	}

	user, e := a.Repo.Login(reqUser.Email, reqUser.Password)
	if e != nil {
		return e
	}

	return WriteJson(w, http.StatusOK, map[string]any{
		"data": user,
	})
}
