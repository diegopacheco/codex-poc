package main

import (
	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"os"
)

type Member struct {
	gorm.Model
	Name    string
	Picture string
	Email   string
}

type Team struct {
	gorm.Model
	Name string
	Logo string
}

type Assignment struct {
	gorm.Model
	MemberID uint
	TeamID   uint
}

type Feedback struct {
	gorm.Model
	Content  string
	MemberID *uint
	TeamID   *uint
}

func main() {
	dsn := os.Getenv("DB_DSN")
	if dsn == "" {
		dsn = "root:password@tcp(127.0.0.1:3306)/coaching?charset=utf8mb4&parseTime=True&loc=Local"
	}
	db, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	db.AutoMigrate(&Member{}, &Team{}, &Assignment{}, &Feedback{})
	r := gin.Default()
	r.POST("/members", func(c *gin.Context) {
		var m Member
		if c.BindJSON(&m) == nil {
			db.Create(&m)
			c.JSON(200, m)
		}
	})
	r.GET("/members", func(c *gin.Context) {
		var ms []Member
		db.Find(&ms)
		c.JSON(200, ms)
	})
	r.POST("/teams", func(c *gin.Context) {
		var t Team
		if c.BindJSON(&t) == nil {
			db.Create(&t)
			c.JSON(200, t)
		}
	})
	r.GET("/teams", func(c *gin.Context) {
		var ts []Team
		db.Find(&ts)
		c.JSON(200, ts)
	})
	r.POST("/assignments", func(c *gin.Context) {
		var a Assignment
		if c.BindJSON(&a) == nil {
			db.Create(&a)
			c.JSON(200, a)
		}
	})
	r.POST("/feedbacks", func(c *gin.Context) {
		var f Feedback
		if c.BindJSON(&f) == nil {
			db.Create(&f)
			c.JSON(200, f)
		}
	})
	r.GET("/feedbacks", func(c *gin.Context) {
		var fs []Feedback
		db.Find(&fs)
		c.JSON(200, fs)
	})
	r.Run()
}
