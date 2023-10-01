package app

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/lulzshadowwalker/go-next/pkg/logger"
)

func (a *App) initRouter() chi.Router {
	r := chi.NewRouter()
	r.Use(logger.Middleware)

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("hello, client!\n"))
	})

	return r
}
