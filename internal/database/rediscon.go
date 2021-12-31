package database

import "github.com/gomodule/redigo/redis"

var rpool *redis.Pool

func init() {
	rpool = newPool()
}

func RIncrementCount() (int, error) {
	rcon := rpool.Get()
	defer rcon.Close()
	return redis.Int(rcon.Do("INCR", "count"))
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
