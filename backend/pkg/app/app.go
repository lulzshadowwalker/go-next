package app

import (
	"database/sql"
	"net/http"

	"github.com/lulzshadowwalker/go-next/pkg/database"
	"github.com/lulzshadowwalker/go-next/pkg/logger"
)

type App struct {
	router http.Handler
	db     *sql.DB
}

func New() *App {
	a := &App{
		db: database.Setup(),
	}
	a.router = a.initRouter()

	return a
}

func (a *App) Start(address string) error {
	server := http.Server{
		Addr:    address,
		Handler: a.router,
	}

	logger.I.Println("starting up the server")
	return server.ListenAndServe()
}
