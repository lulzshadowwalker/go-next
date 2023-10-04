package handler

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path"
	"strings"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/lulzshadowwalker/go-next/pkg/logger"
	"github.com/lulzshadowwalker/go-next/pkg/utils"
)

var RootUploadsDir = "../../uploads/"

func FileServer(r chi.Router, path string) {
	if strings.ContainsAny(path, "{}*") {
		panic("FileServer does not permit any URL parameters.")
	}

	if path != "/" && path[len(path)-1] != '/' {
		r.Get(path, http.RedirectHandler(path+"/", 301).ServeHTTP)
		path += "/"
	}
	path += "*"

	r.Get(path, func(w http.ResponseWriter, r *http.Request) {
		rctx := chi.RouteContext(r.Context())
		pathPrefix := strings.TrimSuffix(rctx.RoutePattern(), "/*")
		fs := http.StripPrefix(pathPrefix, http.FileServer(http.Dir(RootUploadsDir)))
		fs.ServeHTTP(w, r)
	})
}

func StoreFile(w http.ResponseWriter, r *http.Request, filename string) (url string, err error) {
	const maxSize = 2048 * 2048

	r.Body = http.MaxBytesReader(w, r.Body, maxSize)
	err = r.ParseForm()
	if err != nil {
		return "", utils.NewApiErr(http.StatusBadRequest, map[string]any{
			"message": fmt.Sprintf("request cannot be larger than %dMB", maxSize),
		})
	}

	file, header, err := r.FormFile(filename)
	if err != nil {
		return "", utils.NewApiErr(http.StatusBadRequest, map[string]any{
			"message": fmt.Sprintf("file %q is required", filename),
		})
	}

	err = os.MkdirAll(RootUploadsDir, os.ModePerm)
	if err != nil {
		e := fmt.Errorf("cannot create .uploads dir %w", err)
		logger.E.Println(e)
		return "", e
	}

	dstName := fmt.Sprintf("%s-%s", time.Now().Format(time.TimeOnly), header.Filename)
	dst, err := os.Create(path.Join(RootUploadsDir, dstName))
	if err != nil {
		e := fmt.Errorf("cannot create file %q %w", header.Filename, err)
		logger.E.Println(e)
		return "", e
	}

	_, err = io.Copy(dst, file)
	if err != nil {
		e := fmt.Errorf("cannot store file %q %w", header.Filename, err)
		logger.E.Println(e)
		return "", e
	}

	return path.Join(os.Getenv("BASE_URL"), strings.Trim(RootUploadsDir, "./"), dstName), nil
}
