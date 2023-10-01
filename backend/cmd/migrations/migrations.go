package main

import (
	"os"

	"github.com/lulzshadowwalker/go-next/pkg/database/migrations"
	"github.com/lulzshadowwalker/go-next/pkg/logger"
)

func main() {
	l := logger.New(os.Stdout)

	err := migrations.Migrate()
	if err != nil {
		l.E.Fatalf("cannot run migrations %q\n", err)
	}
}
