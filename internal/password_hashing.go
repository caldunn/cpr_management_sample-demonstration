package passwordHashing

import (
	"crypto/rand"
	"crypto/subtle"
	"encoding/base64"
	"fmt"
	"golang.org/x/crypto/argon2"
	"strings"
)

type argonParams struct {
	time, memory, keyLen uint32
	threads              uint8
}

var ap = argonParams{
	time:    1,
	memory:  32 * 1024,
	keyLen:  32,
	threads: 4,
}

func GenerateArgonID(password string, salt []byte) string {
	if salt == nil {
		salt, _ = generateSalt()
	}
	byteKey := generateHash(password, salt)
	encodedHash := fmt.Sprintf(
		"$argon2i$v=%d$m=%d,t=%d,p=%d$%s$%s",
		argon2.Version,
		ap.memory,
		ap.time,
		ap.threads,
		base64.RawStdEncoding.EncodeToString(salt),
		base64.RawStdEncoding.EncodeToString(byteKey),
	)
	return encodedHash
}

func ValidatePassword(password string, encodedArgon string) bool {
	// This implementation is not likely to change. We will discord most values.
	passAndSalt := strings.Split(encodedArgon, "$")[4:]

	decodedSalt, _ := base64.RawStdEncoding.DecodeString(passAndSalt[0])
	decodedOriginalPHash, _ := base64.RawStdEncoding.DecodeString(passAndSalt[1])

	newHash := generateHash(password, decodedSalt)

	return subtle.ConstantTimeCompare(decodedOriginalPHash, newHash) == 1
}

func generateHash(password string, salt []byte) []byte {
	return argon2.IDKey(
		[]byte(password),
		salt,
		ap.time,
		ap.memory,
		ap.threads,
		ap.keyLen,
	)
}

func generateSalt() (blk []byte, err error) {
	salt := make([]byte, 16)
	_, err = rand.Read(salt)
	// Add the pepper
	blk = append(salt, []byte("EYRGD5xtCq!GbWN&")...)

	return
}
