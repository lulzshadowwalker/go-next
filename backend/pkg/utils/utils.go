package utils

import "fmt"

type ApiErr struct {
	Status int `json:"-"`
	Msg    any `json:"message"`
}

func NewApiErr(status int, msg any) *ApiErr {
	return &ApiErr{
		Status: status,
		Msg:    msg,
	}
}

func (a ApiErr) Error() string {
	return fmt.Sprintf("%v", a.Msg)
}
