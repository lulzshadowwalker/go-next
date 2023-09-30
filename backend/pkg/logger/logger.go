package logger

import (
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"
)

type Logger struct {
	// info
	I log.Logger

	// error
	E log.Logger

	// verbose
	V log.Logger

	// debug
	D log.Logger
}

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

var outDest io.Writer = os.Stdout

func init() {
	file, err := createLogsFile()
	if err == nil {
		outDest = file
	}

	I = *log.New(outDest, "👩🏻‍🏫 fyi ⎯ ", log.Ldate|log.Ltime)
	E = *log.New(outDest, "💀 blin ⎯ ", log.Ldate|log.Ltime|log.Llongfile)
	V = *log.New(outDest, "💁🏻‍♀️ btw ⎯ ", log.Ldate|log.Ltime)
	D = *log.New(outDest, "🌬️💨🪰 debug ⎯ ", log.Ldate|log.Ltime|log.Llongfile)

	if file, ok := outDest.(*os.File); ok {
		log.Printf("logging to %s\n", file.Name())
		I.Printf("logging to %s\n", file.Name())
	}
}

func (l *Logger) setup(output io.Writer) {
	l.I = *log.New(output, "👩🏻‍🏫 fyi ⎯ ", log.Ldate|log.Ltime)
	l.E = *log.New(output, "💀 blin ⎯ ", log.Ldate|log.Ltime|log.Llongfile)
	l.V = *log.New(output, "💁🏻‍♀️ btw ⎯ ", log.Ldate|log.Ltime)
	l.D = *log.New(output, "🌬️💨🪰 debug ⎯ ", log.Ldate|log.Ltime|log.Llongfile)

	if file, ok := output.(*os.File); ok {
		log.Printf("logging to %s\n", file.Name())
		I.Printf("logging to %s\n", file.Name())
	}
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

func New(output io.Writer) *Logger {
	l := &Logger{}
	l.setup(output)
	return l
}

func Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		V.Println(r.Method, r.URL.Path)
		next.ServeHTTP(w, r)
	})
}
