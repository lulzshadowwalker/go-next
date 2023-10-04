package model

type User struct {
	Id             int    `json:"id,omitempty"`
	Name           string `json:"name"`
	Email          string `json:"email"`
	Password       string `json:"-"`
	ProfilePicture string `json:"profile_picture,omitempty"`
}

type RegisterRequestUser struct {
	Name           string `validate:"required"`
	Email          string `validate:"required,email"`
	Password       string `validate:"required,min=8"`
	ProfilePicture string
}

type LoginRequestUser struct {
	Email    string `validate:"required,email"`
	Password string `validate:"required"`
}

func NewRegisterRequestUser(name, email, password, profilePic string) *RegisterRequestUser {
	return &RegisterRequestUser{
		Name:           name,
		Email:          email,
		Password:       password,
		ProfilePicture: profilePic,
	}
}

func NewLoginRequestUser(email, password string) *LoginRequestUser {
	return &LoginRequestUser{
		Email:    email,
		Password: password,
	}
}
