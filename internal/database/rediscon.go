// Package database Contains the connection pools with public methods for certain access. If a function starts with R it
// is a Redis db and P is for PostGres.
package database

import (
	"cpr_management/internal/data_models"
	"errors"
	"fmt"
	"github.com/gomodule/redigo/redis"
)

var rpool *redis.Pool

const tokenMaxAge = 60 * 60 * 24 * 7

func init() {
	rpool = newPool()
}

func RIncrementCount() (int, error) {
	conn := rpool.Get()
	defer conn.Close()
	return redis.Int(conn.Do("INCR", "count"))
}

func CreateNewSession() (string, error) {
	conn := rpool.Get()
	defer conn.Close()
	return redis.String(conn.Do("SET", "yep", "1"))

}

func SetAndExpireHash() {
	conn := rpool.Get()
	defer conn.Close()
	err := conn.Send("MULTI")
	err = conn.Send("SEt", "m1", "yes", "EX", "3")
	res, err := conn.Do("EXEC")
	resArr, err := redis.Values(res, err)
	if err != nil {
		return
	}
	fmt.Println(resArr)
	// var m1Set, m2Set, m1Val string
	// fmt.Println(redis.String(resArr[2], nil))
}

func RRetrieveSession(encodedToken string) (session data_models.Session, err error) {
	conn := rpool.Get()
	defer conn.Close()
	res, err := conn.Do("HGETALL", encodedToken)
	resArr, err := redis.Values(res, err)
	if len(resArr) == 0 {
		return session, errors.New("there is no data for this key")
	}

	if err := redis.ScanStruct(resArr, &session); err != nil {
		fmt.Println(err)
		return session, err
	}

	fmt.Printf("%+v\n", session)
	return
}

func CheckSessionKeyExistence(hashedToken string) bool {
	conn := rpool.Get()
	defer conn.Close()

	// Go simplicity tends to get in the way.
	keyExists := false
	result, err := redis.Int(conn.Do("EXISTS", hashedToken))

	if err != nil && result == 1 {
		keyExists = true
	}

	return keyExists
}

func newPool() *redis.Pool {
	return &redis.Pool{
		MaxIdle:   80,
		MaxActive: 12000,
		Dial: func() (redis.Conn, error) {
			c, err := redis.Dial("tcp", "172.17.0.3:6379")
			if err != nil {
				panic(err.Error())
			}
			return c, err
		},
	}
}
