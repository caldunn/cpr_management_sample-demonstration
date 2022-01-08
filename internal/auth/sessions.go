package auth

import (
	"cpr_management/internal/data_models"
	"cpr_management/internal/database"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
)

func GenerateSessionKey() string {
	key := make([]byte, 16)
	rand.Read(key)
	sessionKey := encodeAndHash(key)

	if !database.CheckSessionKeyExistence(sessionKey) {
		return sessionKey
	}
	// Recurse - I dont expect many collisions.
	return GenerateSessionKey()
}

func RetrieveSession(sid string) (data_models.Session, error) {
	asBytes := []byte(sid)
	return database.RRetrieveSession(encodeAndHash(asBytes))
}

func DeleteSession(sid string) error {
	asBytes := []byte(sid)
	return database.RDropSession(encodeAndHash(asBytes))
}

func encodeAndHash(randomBytes []byte) string {
	// Hash then encode.should
	asArray := sha256.Sum256(randomBytes)
	return base64.RawStdEncoding.EncodeToString(asArray[:])
}
