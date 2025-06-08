package main

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Member struct {
	ID      uint `gorm:"primaryKey"`
	Name    string
	Picture string
	Email   string
}

type Team struct {
	ID   uint `gorm:"primaryKey"`
	Name string
	Logo string
}

type TeamMember struct {
	ID       uint `gorm:"primaryKey"`
	TeamID   uint
	MemberID uint
}

type Feedback struct {
	ID       uint `gorm:"primaryKey"`
	Message  string
	MemberID uint
	TeamID   uint
}

func setupRouter(db *gorm.DB) *gin.Engine {
	r := gin.Default()
	r.POST("/members", func(c *gin.Context) {
		var m Member
		if c.BindJSON(&m) == nil {
			db.Create(&m)
			c.JSON(http.StatusOK, m)
		}
	})
	r.POST("/teams", func(c *gin.Context) {
		var t Team
		if c.BindJSON(&t) == nil {
			db.Create(&t)
			c.JSON(http.StatusOK, t)
		}
	})
	r.POST("/assign", func(c *gin.Context) {
		var tm TeamMember
		if c.BindJSON(&tm) == nil {
			db.Create(&tm)
			c.JSON(http.StatusOK, tm)
		}
	})
	r.POST("/feedback", func(c *gin.Context) {
		var f Feedback
		if c.BindJSON(&f) == nil {
			db.Create(&f)
			c.JSON(http.StatusOK, f)
		}
	})
	return r
}

func main() {
	dsn := os.Getenv("MYSQL_DSN")
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	db.AutoMigrate(&Member{}, &Team{}, &TeamMember{}, &Feedback{})
	r := setupRouter(db)
	r.Run()
}
