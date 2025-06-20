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

// allows accepting either IDs or names
type AssignmentInput struct {
	Member   string
	Team     string
	MemberID uint
	TeamID   uint
}

type Feedback struct {
	gorm.Model
	Content  string
	MemberID *uint
	TeamID   *uint
}

type FeedbackInput struct {
	Target   string
	Message  string
	MemberID uint
	TeamID   uint
	Content  string
}

type TeamWithMembers struct {
	Team    Team
	Members []Member
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

	r.DELETE("/members/:id", func(c *gin.Context) {
		id := c.Param("id")
		db.Delete(&Member{}, id)
		db.Where("member_id = ?", id).Delete(&Assignment{})
		c.Status(http.StatusOK)
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

	r.GET("/team-members", func(c *gin.Context) {
		var ts []Team
		db.Find(&ts)
		var result []TeamWithMembers
		for _, t := range ts {
			var members []Member
			db.Joins("JOIN assignments ON assignments.member_id = members.id").Where("assignments.team_id = ?", t.ID).Find(&members)
			result = append(result, TeamWithMembers{Team: t, Members: members})
		}
		c.JSON(http.StatusOK, result)
	})

	r.POST("/assignments", func(c *gin.Context) {
		var in AssignmentInput
		if c.BindJSON(&in) == nil {
			var a Assignment
			if in.MemberID != 0 && in.TeamID != 0 {
				a.MemberID = in.MemberID
				a.TeamID = in.TeamID
			} else {
				if in.Member != "" {
					var m Member
					if err := db.Where("name = ?", in.Member).First(&m).Error; err == nil {
						a.MemberID = m.ID
					}
				}
				if in.Team != "" {
					var t Team
					if err := db.Where("name = ?", in.Team).First(&t).Error; err == nil {
						a.TeamID = t.ID
					}
				}
			}
			db.Create(&a)
			c.JSON(http.StatusOK, a)
		}
	})

	r.GET("/assignments", func(c *gin.Context) {
		var as []Assignment
		db.Find(&as)
		c.JSON(http.StatusOK, as)
	})

	r.DELETE("/assignments", func(c *gin.Context) {
		var a Assignment
		if c.BindJSON(&a) == nil {
			db.Where("member_id = ? AND team_id = ?", a.MemberID, a.TeamID).Delete(&Assignment{})
			c.Status(http.StatusOK)
		}
	})

	r.POST("/feedbacks", func(c *gin.Context) {
		var in FeedbackInput
		if c.BindJSON(&in) == nil {
			var f Feedback
			f.Content = in.Content
			if f.Content == "" {
				f.Content = in.Message
			}
			if in.MemberID != 0 {
				f.MemberID = &in.MemberID
			} else if in.Target != "" {
				var m Member
				if err := db.Where("name = ?", in.Target).First(&m).Error; err == nil {
					f.MemberID = &m.ID
				} else {
					var t Team
					if err := db.Where("name = ?", in.Target).First(&t).Error; err == nil {
						f.TeamID = &t.ID
					}
				}
			} else if in.TeamID != 0 {
				f.TeamID = &in.TeamID
			}
			if err := db.Create(&f).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
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
