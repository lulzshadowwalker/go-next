package main

import (
	"errors"
	"net/http"

	"github.com/golang-jwt/jwt/v5"
	"github.com/lulzshadowwalker/go-next/pkg/app"
	"github.com/lulzshadowwalker/go-next/pkg/logger"
)

type AppClaims struct {
	jwt.RegisteredClaims
}

func (a *AppClaims) Valid() error {
	return nil
}

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
