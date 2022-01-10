package database

import (
	"context"
	"fmt"
	"github.com/jackc/pgx/v4/pgxpool"
	"os"
	"time"
)

var dbPool *pgxpool.Pool

func init() {
	var err error
	dbPool, err = pgxpool.Connect(context.Background(), os.Getenv("PG_CONNECTION"))
	if err != nil {
		fmt.Println("Postgres connection could not be attained.")
		time.Sleep(5 * time.Second)
		os.Exit(-1)
	}
}

func PGetUserEncodedPassword(username string) (encodedPassword string, err error) {
	err = dbPool.QueryRow(context.Background(), "SELECT encoded_password FROM users WHERE username=$1", username).Scan(&encodedPassword)
	if err != nil {
		return "", err
	}
	return encodedPassword, nil
}
