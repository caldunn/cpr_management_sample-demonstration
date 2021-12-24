package main

import (
	"flag"
	"fmt"
	"github.com/gin-gonic/gin"
	_ "net/http"
)

func main() {
	port := flag.Int("port", 8080, "The port to run the service on.")
	asRelease := flag.Bool("release", false, "Run the webserver in production mode.")
	flag.Parse()

	// If the program is set to run in release.
	if *asRelease {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.Default()
	r.GET("/", hello)
	r.GET("/error", errorCode)

	r.Run(fmt.Sprintf(":%d", *port))
}

func hello(ctx *gin.Context) {
	ctx.JSON(200, gin.H{
		"message": "Hello World!",
	})
}

func errorCode(ctx *gin.Context) {
	ctx.JSON(400, gin.H{
		"error": "uh oh",
	})
}
