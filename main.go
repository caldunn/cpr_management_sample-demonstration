package main

import (
	"cpr_management/internal/auth"
	"cpr_management/internal/data_models"
	"cpr_management/internal/database"
	"flag"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v4"
	"io"
	"log"
	"net/http"
	"os"
	"time"
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
	// r.Use(auth.UserRequired)
	r.Use(func(ctx *gin.Context) {
		ctx.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		if ctx.Request.Method == "OPTIONS" {
			ctx.AbortWithStatus(204)
			return
		}
		ctx.Next()
	})
	r.GET("/", hello)
	r.POST("/login", login)
	r.POST("/logout", signOut)
	r.GET("/json", sampleJobJson)
	r.GET("/count", countMe)
	r.GET("/pipeline", pipeLine)
	r.POST("/upload", uploadFile)

	r.Run(fmt.Sprintf(":%d", *port))

}

func pipeLine(ctx *gin.Context) {
	database.SetAndExpireHash()
	cookie, err := ctx.Cookie("yep")
	if err != nil {
		fmt.Printf("Error: %e", err)
	} else {
		println(cookie)
	}

	currentTime := time.Now().Unix() + 60
	fmt.Println(currentTime)
	auth.RetrieveSession("testAuth")
	ctx.JSON(http.StatusUnauthorized, gin.H{
		"message": "Bugger off",
	})
}

func uploadFile(ctx *gin.Context) {
	// Multipart form
	form, _ := ctx.MultipartForm()
	files := form.File["uploads[]"]

	for _, file := range files {
		log.Println(file.Filename)
		// file.Filename = "kekl.txt"
		err := ctx.SaveUploadedFile(file, "/tmp/cpr_management/uploads/kek.txt")
		if err != nil {
			println("hmmmm")
		}
	}
	ctx.String(http.StatusOK, fmt.Sprintf("%d files uploaded!", len(files)))
}

func hello(ctx *gin.Context) {
	ctx.JSON(200, gin.H{
		"message": "Hello World!",
	})
}

func login(ctx *gin.Context) {

	user, pass, _ := ctx.Request.BasicAuth()
	encodedPassword, err := database.PGetUserEncodedPassword(user)

	if err != nil {
		if err == pgx.ErrNoRows {
			fmt.Fprintf(os.Stderr, "User does not exist")
		}
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"msg": "Invalid login details",
		})
		return
	}

	isMatch := auth.ValidatePassword(pass, encodedPassword)

	sessionKey := "yep"
	if isMatch {
		sessionKey = auth.GenerateSessionKey()
		ctx.SetCookie(
			"sid",
			sessionKey,
			60*60,
			"/",
			"",
			true,
			true,
		)

		ctx.SetCookie(
			"il",
			"y",
			60*60,
			"/",
			"",
			false,
			false,
		)
	} else {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"msg": "Invalid login details",
		})
		return
	}

	ctx.JSON(200, gin.H{
		"firstName":     "Caleb",
		"username":      "caldunn",
		"tokenValidFor": 60 * 60,
	})
}

func signOut(ctx *gin.Context) {
	cookie, _ := ctx.Cookie("sid")
	auth.DeleteSession(cookie)
	ctx.SetCookie(
		"sid",
		"",
		-1,
		"/",
		"",
		true,
		true,
	)
	ctx.JSON(200, gin.H{
		"success": "you have successfully logged out",
	})
}

func countMe(ctx *gin.Context) {
	count, _ := database.RIncrementCount()
	ctx.JSON(200, gin.H{
		"count": count,
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
