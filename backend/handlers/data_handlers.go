package handlers

import (
	"log"
	"net/http"
	"os"

	"portfolio/services"
	"portfolio/services/redis"
	"portfolio/utils"

	"github.com/gofiber/fiber/v2"
)

// DataHandler is responsible for handling routes related to various data types.
type DataHandler struct {
	RedisClient redis.RedisCache
}

// NewDataHandler creates a new instance of DataHandler with the given dependencies.
func NewDataHandler() DataHandler {
	return DataHandler{
		RedisClient: redis.NewRedisCache(),
	}
}

// HandleData handles the GET requests for /{dataType} route where dataType can be "projects," "skills," "certifications," "roadmap," or "wakatime."
func (h *DataHandler) HandleData(c *fiber.Ctx) error {
	dataType := c.Params("dataType")

	switch dataType {
	case "roadmap":
		key := "roadmap"
		data, err := services.GetMongoData(h.RedisClient, key)
		if err != nil {
			log.Println(err)
			return c.SendStatus(http.StatusInternalServerError)
		}
		return c.JSON(data)

	case "wakatime":
		key := "wakatime"
		data, err := services.GetWakatimeData(h.RedisClient, key)
		if err != nil {
			log.Println(err)
			return c.SendStatus(http.StatusInternalServerError)
		}
		return c.JSON(data)

	default:
		// Handle other data types (e.g., "projects," "skills," "certifications")
		key := dataType
		url := utils.GetEnv("DB_URL", "") + "?action=getData&sheetName=" + key

		data, err := services.GetData(h.RedisClient, url, key)
		if err != nil {
			log.Println(err)
			return c.SendStatus(http.StatusInternalServerError)
		}
		return c.JSON(data)
	}
}

// FlushCache handles the POST /flush-cache route.
func (h *DataHandler) FlushCache(c *fiber.Ctx) error {
	expectedToken := os.Getenv("API_TOKEN")
	actualToken := c.Get("Authorization")

	if actualToken != expectedToken {
		return c.SendStatus(http.StatusUnauthorized)
	}

	h.RedisClient.FlushAllCache()

	return c.SendStatus(http.StatusOK)
}