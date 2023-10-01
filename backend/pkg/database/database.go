package database

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/go-sql-driver/mysql"
	_ "github.com/lulzshadowwalker/go-next/internal/config"
	"github.com/lulzshadowwalker/go-next/pkg/logger"
)

func Setup() *sql.DB {
	uname := os.Getenv("DB_USERNAME")
	pwd := os.Getenv("DB_PASSWORD")
	host := os.Getenv("DB_HOST")
	dbName := os.Getenv("DB_DATABASE")

	conStr := fmt.Sprintf("%s:%s@tcp(%s)/%s", uname, pwd, host, dbName)

	db, err := sql.Open("mysql", conStr)
	if err != nil {
		logger.E.Fatalf("cannot connect to database %q\n", err)
		return nil
	}

	err = db.Ping()
	if err != nil {
		logger.E.Fatalf("cannot connect to database %q\n", err)
		return nil
	}

	return db
}
