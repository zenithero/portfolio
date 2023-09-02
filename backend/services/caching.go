package services

import (
	"log"
	googlesheet "portfolio/services/google-sheet"
	"portfolio/services/redis"
	"time"
)

func GetData(redisClient redis.RedisCache, url string, cacheKey string) ([]map[string]interface{}, error) {
	var data []map[string]interface{}

	err := redisClient.GetCache(cacheKey, &data)
	if err != nil {
		data, err = googlesheet.GetDataFromAPI(url)
		if err != nil {
			return nil, err
		}

		err = redisClient.SetCache(cacheKey, data, 24*time.Hour)
		if err != nil {
			log.Println("Error caching data:", err)
		}
	}

	return data, nil
}
