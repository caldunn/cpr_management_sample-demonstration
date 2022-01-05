package auth

import (
	"cpr_management/internal/data_models"
	"errors"
	"github.com/gin-gonic/gin"
	"net/http"
)

func AdminRequired(ctx *gin.Context) {
	role, err := sharedAuth(ctx)
	if err != nil {
		ctx.Abort()
		return
	}
	if role != data_models.Admin {
		ctx.JSON(http.StatusForbidden, gin.H{
			"message": "elevated privileges required",
		})
		ctx.Abort()
		return
	}
}

func UserRequired(ctx *gin.Context) {
	_, err := sharedAuth(ctx)
	if err != nil {
		ctx.Abort()
		return
	}
}

func sharedAuth(ctx *gin.Context) (data_models.UserRole, error) {
	sid, err := ctx.Cookie("sid")

	// If there is no session token.
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"message": "session id not provided",
		})
		ctx.Abort()
		return data_models.NO_AUTH, errors.New("no session id")
	}

	session, err := RetrieveSession(sid)
	// If the token can not be found in the redis cache.
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"message": "invalid token.",
		})
		ctx.Abort()
		return data_models.NO_AUTH, errors.New("invalid token")
	}

	return session.Role, nil
}
