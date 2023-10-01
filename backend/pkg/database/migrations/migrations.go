package migrations

import (
	"database/sql"

	_ "github.com/lulzshadowwalker/go-next/internal/config"
	"github.com/lulzshadowwalker/go-next/pkg/database"
	"github.com/lulzshadowwalker/go-next/pkg/logger"
)

type Migration struct {
	db *sql.DB
}

var migrator *Migration

func init() {
	db := database.Setup()

	migrator = &Migration{
		db: db,
	}
	logger.V.Println("connected to database ✨")
}

func Migrate() error {
	err := migrator.users()
	err = migrator.posts()

	return err
}
