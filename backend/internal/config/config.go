package config

import (
	"github.com/joho/godotenv"
	"github.com/lulzshadowwalker/go-next/pkg/logger"
)

func init() {
	err := godotenv.Load("../../.env")
	if err != nil {
		logger.E.Printf("cannot load app config %q\n", err)
	}
}
