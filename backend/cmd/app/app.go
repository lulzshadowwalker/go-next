package main

import (
	"errors"
	"net/http"

	_ "github.com/lulzshadowwalker/go-next/internal/config"
	"github.com/lulzshadowwalker/go-next/pkg/app"
	"github.com/lulzshadowwalker/go-next/pkg/logger"
)

func main() {
	app := app.New()

	err := app.Start(":3000")
	if err != nil {
		if errors.Is(err, http.ErrServerClosed) {
			logger.V.Println("server shutdown")
			return
		}

		logger.E.Fatalf("server terminated %q", err)
	}
}
