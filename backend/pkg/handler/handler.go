package handler

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-playground/validator"
	"github.com/lulzshadowwalker/go-next/pkg/logger"
	"github.com/lulzshadowwalker/go-next/pkg/utils"
)

type wrappedHandlerFunc func(w http.ResponseWriter, r *http.Request) error

// single instance as it caches structs
var validate *validator.Validate

func init() {
	validate = validator.New()
}

func generateValidationMessage(errors []validator.FieldError) []string {
	res := make([]string, len(errors))
	for i, err := range errors {
		res[i] = fmt.Sprintf("%s %s: %s", err.Kind(), err.StructField(), err.Tag())
	}

	return res
}

func Unwrap(fn wrappedHandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		err := fn(w, r)
		if err != nil {
			if apiErr, ok := err.(*utils.ApiErr); ok {
				WriteJson(w, apiErr.Status, apiErr)
				return
			}

			WriteJson(w, http.StatusInternalServerError, map[string]any{
				"message": "unknown error has occurred",
			})
			logger.E.Println(err)
		}
	}
}

func WriteJson(w http.ResponseWriter, status int, body any) error {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(status)
	return json.NewEncoder(w).Encode(body)
}
