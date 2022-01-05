package database

import (
	"context"
	"github.com/jackc/pgx/v4/pgxpool"
	"os"
)

var dbPool *pgxpool.Pool

func init() {
	dbPool, _ = pgxpool.Connect(context.Background(), os.Getenv("PG_CONNECTION"))
}

func PGetUserEncodedPassword(username string) (encodedPassword string, err error) {
	err = dbPool.QueryRow(context.Background(), "SELECT encoded_password FROM users WHERE username=$1", username).Scan(&encodedPassword)
	if err != nil {
		return "", err
	}
	return encodedPassword, nil
}
