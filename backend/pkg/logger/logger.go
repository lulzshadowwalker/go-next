package logger

import (
	"errors"
	"fmt"
	"log"
	"os"
	"time"
)

var (
	// info
	I log.Logger

	// error
	E log.Logger

	// verbose
	V log.Logger

	// debug
	D log.Logger
)

var outDest = os.Stdout

func init() {
	file, err := createLogsFile()
	if err == nil {
		outDest = file
	}

	I = *log.New(outDest, "👩🏻‍🏫 fyi ⎯ ", log.Ldate|log.Ltime|log.Llongfile)
	E = *log.New(outDest, "💀 blin ⎯ ", log.Ldate|log.Ltime|log.Llongfile)
	V = *log.New(outDest, "💁🏻‍♀️ btw ⎯ ", log.Ldate|log.Ltime|log.Llongfile)
	D = *log.New(outDest, "🌬️💨🪰 debug ⎯ ", log.Ldate|log.Ltime|log.Llongfile)
}

func createLogsFile() (*os.File, error) {
	err := os.Mkdir("../../logs", os.ModePerm)
	if err != nil && !errors.Is(err, os.ErrExist) {
		err := fmt.Errorf("ERROR: could not create the logs directory %q\n", err)
		log.Println(err.Error())
		return nil, err
	}

	date := time.Now().UTC().Format("2006-1-2 15:4:5")
	filename := "log " + date + ".txt"
	file, err := os.Create("../../logs/" + filename)
	if err != nil && !errors.Is(err, os.ErrExist) {
		err = fmt.Errorf("ERROR: could not create %q log %q\n", filename, err)
		log.Println(err.Error())
		return nil, err
	}

	return file, nil
}
