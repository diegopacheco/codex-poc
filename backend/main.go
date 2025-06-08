package main

import (
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
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

func setupRouter(db *gorm.DB) *gin.Engine {
	r := gin.Default()
	r.Use(cors.Default())

	r.POST("/members", func(c *gin.Context) {
		var m Member
		if c.BindJSON(&m) == nil {
			db.Create(&m)
			c.JSON(http.StatusOK, m)
		}
	})

	r.GET("/members", func(c *gin.Context) {
		var ms []Member
		db.Find(&ms)
		c.JSON(http.StatusOK, ms)
	})

	r.POST("/teams", func(c *gin.Context) {
		var t Team
		if c.BindJSON(&t) == nil {
			db.Create(&t)
			c.JSON(http.StatusOK, t)
		}
	})

	r.GET("/teams", func(c *gin.Context) {
		var ts []Team
		db.Find(&ts)
		c.JSON(http.StatusOK, ts)
	})

	r.POST("/assignments", func(c *gin.Context) {
		var a Assignment
		if c.BindJSON(&a) == nil {
			db.Create(&a)
			c.JSON(http.StatusOK, a)
		}
	})

	r.POST("/feedbacks", func(c *gin.Context) {
		var f Feedback
		if c.BindJSON(&f) == nil {
			db.Create(&f)
			c.JSON(http.StatusOK, f)
		}
	})

	r.GET("/feedbacks", func(c *gin.Context) {
		var fs []Feedback
		db.Find(&fs)
		c.JSON(http.StatusOK, fs)
	})

	r.GET("/members/:id/feedbacks", func(c *gin.Context) {
		var fs []Feedback
		if err := db.Where("member_id = ?", c.Param("id")).Find(&fs).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, fs)
	})

	return r
}

func main() {
	dsn := os.Getenv("DB_DSN")
	if dsn == "" {
		dsn = "root:password@tcp(127.0.0.1:3306)/coaching?charset=utf8mb4&parseTime=True&loc=Local"
	}

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	db.AutoMigrate(&Member{}, &Team{}, &Assignment{}, &Feedback{})

	r := setupRouter(db)
	r.Run()
}
