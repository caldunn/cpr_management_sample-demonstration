package main

import (
	"cpr_management/internal"
	"cpr_management/internal/data_models"
	"cpr_management/internal/database"
	"flag"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v4"
	"io"
	_ "net/http"
	"os"
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
	r.POST("/login", login)
	r.GET("/json", sampleJobJson)
	r.GET("/count", countMe)

	r.Run(fmt.Sprintf(":%d", *port))

}

func hello(ctx *gin.Context) {
	ctx.JSON(200, gin.H{
		"message": "Hello World!",
	})
}

func login(ctx *gin.Context) {

	user, pass, _ := ctx.Request.BasicAuth()
	encodedPassword, err := database.GetUserEncodedPassword(user)

	if err != nil {
		if err == pgx.ErrNoRows {
			fmt.Fprintf(os.Stderr, "User does not exist")
		}
		fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
	}

	isMatch := passwordHashing.ValidatePassword(pass, encodedPassword)

	ctx.JSON(300, gin.H{
		"match": isMatch,
	})
}

func countMe(ctx *gin.Context) {
	x, _ := database.RIncrementCount()
	ctx.JSON(200, gin.H{
		"count": x,
	})
}
func sampleJobJson(ctx *gin.Context) {
	file, err := os.Open("/home/caleb/dev/golang/cpr_management/sample-data/standard-user-jobs.json")

	if err != nil {
		standardJSONError(ctx)
		return
	}

	defer file.Close()
	rawBytes, _ := io.ReadAll(file)
	job, err := data_models.UnmarshalStandardJob(rawBytes)
	if err != nil {
		standardJSONError(ctx)
		return
	}
	ctx.JSON(200, job)
}

func standardJSONError(ctx *gin.Context) {
	ctx.JSON(300, gin.H{
		"message": "Whoops",
	})
	return
}
