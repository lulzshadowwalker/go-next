package migrations

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/go-sql-driver/mysql"
	_ "github.com/lulzshadowwalker/go-next/internal/config"
	"github.com/lulzshadowwalker/go-next/pkg/logger"
)

type Migration struct {
	db *sql.DB
}

var migrator *Migration

func init() {
	uname := os.Getenv("DB_USERNAME")
	pwd := os.Getenv("DB_PASSWORD")
	host := os.Getenv("DB_HOST")
	dbName := os.Getenv("DB_DATABASE")

	conStr := fmt.Sprintf("%s:%s@tcp(%s)/%s", uname, pwd, host, dbName)

	db, err := sql.Open("mysql", conStr)
	if err != nil {
		logger.E.Printf("cannot connect to database %q\n", err)
		return
	}

	err = db.Ping()
	if err != nil {
		logger.E.Printf("cannot connect to database %q\n", err)
		return
	}

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
