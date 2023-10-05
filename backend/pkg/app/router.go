package app

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/lulzshadowwalker/go-next/pkg/handler"
	"github.com/lulzshadowwalker/go-next/pkg/logger"
	"github.com/lulzshadowwalker/go-next/pkg/repo"
	"github.com/lulzshadowwalker/go-next/pkg/utils"
	"github.com/rs/cors"
)

func (a *App) initRouter() chi.Router {
	r := chi.NewRouter()
	r.Use(logger.Middleware)
	r.Use(cors.AllowAll().Handler)
	handler.FileServer(r, "/uploads/")

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("hello, client!\n"))
	})

	r.Route("/auth", a.regAuthRoutes)
	r.Route("/posts", a.regPostsRoutes)

	r.Post("/file", handler.Unwrap(func(w http.ResponseWriter, r *http.Request) error {
		url, err := handler.StoreFile(w, r, "image")
		if err != nil {
			return utils.NewApiErr(500, err.Error())
		}

		return handler.WriteJson(w, 200, url)
	},
	))

	return r
}

func (a *App) regAuthRoutes(r chi.Router) {
	auth := handler.Auth{
		Repo: &repo.AuthRepo{
			Db: a.db,
		},
	}

	r.Post("/register", handler.Unwrap(auth.Register))
	r.Post("/login", handler.Unwrap(auth.Login))
}

func (a *App) regPostsRoutes(r chi.Router) {
	h := handler.Posts{
		Repo: &repo.PostsRepo{
			Db: a.db,
		},
	}

	r.Get("/", handler.Unwrap(h.Index))
	r.Post("/", handler.Unwrap(h.Create))
}
