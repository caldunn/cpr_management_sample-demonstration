package data_models

import "strings"

type Session struct {
	Role   UserRole `redis:"role"`
	Expiry int      `redis:"expiry"`
}

// UserRole needs to be a string so that it can be serialised with default parsers.
type UserRole string

const (
	User  UserRole = "user"
	Admin UserRole = "admin"
	// NO_AUTH Unauthorised role ( ANON )
	NO_AUTH UserRole = "nouser"
)

func StringToEnum(inStr string) UserRole {
	switch strings.ToLower(inStr) {
	case "user":
		return User
	case "admin":
		return Admin
	}

	// Just return a user as default
	return User
}
