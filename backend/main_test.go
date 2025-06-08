package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strconv"
	"testing"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func setupTestDB(t *testing.T) *gorm.DB {
	dsn := "file:" + t.Name() + "?mode=memory&cache=shared"
	db, err := gorm.Open(sqlite.Open(dsn), &gorm.Config{})
	if err != nil {
		t.Fatalf("failed to open db: %v", err)
	}
	err = db.AutoMigrate(&Member{}, &Team{}, &Assignment{}, &Feedback{})
	if err != nil {
		t.Fatalf("failed to migrate: %v", err)
	}
	return db
}

func performRequest(r http.Handler, method, path string, body interface{}) *httptest.ResponseRecorder {
	var buf bytes.Buffer
	if body != nil {
		json.NewEncoder(&buf).Encode(body)
	}
	req, _ := http.NewRequest(method, path, &buf)
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	return w
}

func TestCreateMember(t *testing.T) {
	db := setupTestDB(t)
	router := setupRouter(db)

	w := performRequest(router, "POST", "/members", map[string]string{"name": "John"})
	if w.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", w.Code)
	}
}

func TestCreateTeam(t *testing.T) {
	db := setupTestDB(t)
	router := setupRouter(db)

	w := performRequest(router, "POST", "/teams", map[string]string{"name": "T1"})
	if w.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", w.Code)
	}
}

func TestAssignMember(t *testing.T) {
	db := setupTestDB(t)
	router := setupRouter(db)

	// create member
	mResp := performRequest(router, "POST", "/members", map[string]string{"name": "John"})
	var m Member
	json.Unmarshal(mResp.Body.Bytes(), &m)

	// create team
	tResp := performRequest(router, "POST", "/teams", map[string]string{"name": "T1"})
	var team Team
	json.Unmarshal(tResp.Body.Bytes(), &team)

	w := performRequest(router, "POST", "/assignments", map[string]uint{"memberID": m.ID, "teamID": team.ID})
	if w.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", w.Code)
	}
}

func TestFeedback(t *testing.T) {
	db := setupTestDB(t)
	router := setupRouter(db)

	// create member
	mResp := performRequest(router, "POST", "/members", map[string]string{"name": "John"})
	var m Member
	json.Unmarshal(mResp.Body.Bytes(), &m)

	// create team
	tResp := performRequest(router, "POST", "/teams", map[string]string{"name": "T1"})
	var team Team
	json.Unmarshal(tResp.Body.Bytes(), &team)

	// assign to create relation
	performRequest(router, "POST", "/assignments", map[string]uint{"memberID": m.ID, "teamID": team.ID})

	// post feedback
	w := performRequest(router, "POST", "/feedbacks", map[string]interface{}{"content": "hi", "memberID": m.ID, "teamID": team.ID})
	if w.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", w.Code)
	}

	// get feedback list
	list := performRequest(router, "GET", "/members/"+strconv.FormatUint(uint64(m.ID), 10)+"/feedbacks", nil)
	if list.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", list.Code)
	}
}

func TestRemoveAndDeleteMember(t *testing.T) {
	db := setupTestDB(t)
	router := setupRouter(db)

	mResp := performRequest(router, "POST", "/members", map[string]string{"name": "John"})
	var m Member
	json.Unmarshal(mResp.Body.Bytes(), &m)

	tResp := performRequest(router, "POST", "/teams", map[string]string{"name": "T1"})
	var team Team
	json.Unmarshal(tResp.Body.Bytes(), &team)

	performRequest(router, "POST", "/assignments", map[string]uint{"memberID": m.ID, "teamID": team.ID})

	w := performRequest(router, "DELETE", "/assignments", Assignment{MemberID: m.ID, TeamID: team.ID})
	if w.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", w.Code)
	}

	w = performRequest(router, "DELETE", "/members/"+fmt.Sprint(m.ID), nil)
	if w.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", w.Code)
	}
}

func TestTeamMembersEndpoint(t *testing.T) {
	db := setupTestDB(t)
	router := setupRouter(db)

	mResp := performRequest(router, "POST", "/members", map[string]string{"name": "John"})
	var m Member
	json.Unmarshal(mResp.Body.Bytes(), &m)

	tResp := performRequest(router, "POST", "/teams", map[string]string{"name": "T1"})
	var team Team
	json.Unmarshal(tResp.Body.Bytes(), &team)

	performRequest(router, "POST", "/assignments", map[string]uint{"memberID": m.ID, "teamID": team.ID})

	w := performRequest(router, "GET", "/team-members", nil)
	if w.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", w.Code)
	}
}

func TestAssignmentsEndpoint(t *testing.T) {
	db := setupTestDB(t)
	router := setupRouter(db)

	mResp := performRequest(router, "POST", "/members", map[string]string{"name": "John"})
	var m Member
	json.Unmarshal(mResp.Body.Bytes(), &m)

	tResp := performRequest(router, "POST", "/teams", map[string]string{"name": "T1"})
	var team Team
	json.Unmarshal(tResp.Body.Bytes(), &team)

	w := performRequest(router, "POST", "/assignments", map[string]string{"member": "John", "team": "T1"})
	if w.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", w.Code)
	}

	w = performRequest(router, "GET", "/assignments", nil)
	if w.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", w.Code)
	}
	var as []Assignment
	json.Unmarshal(w.Body.Bytes(), &as)
	found := false
	for _, a := range as {
		if a.MemberID == m.ID && a.TeamID == team.ID {
			found = true
			break
		}
	}
	if !found {
		t.Fatalf("assignment not stored correctly")
	}
}
