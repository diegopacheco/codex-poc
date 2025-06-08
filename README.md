# No Sugar Coaching 

A Simple Team Coaching App without sugar.

<img src="logo-app.png" width="200">

## Features

* Create and manage team members
* Assign members to teams
* Provide feedback on team performance
* Provide feedback on people performance

## How to run

Start the entire stack with Docker Compose:

```
./start.sh
```

If you prefer to run the backend manually, start only the database first:

```
docker-compose up -d db
```

Then run the server locally:

```
go run ./backend
```

API endpoints:

- `POST /members`
- `GET /members`
- `GET /members/{id}/feedbacks`
- `POST /teams`
- `GET /teams`
- `POST /assignments`
- `POST /feedbacks`
- `GET /feedbacks`

### Stack

* Frontend: React, TypeScript, Bun and Vite
* Backend: Go, Gin, Gorm, MySQL
* Database: MySQL running in a Docker container

### Development

This was build using `OpenAI CODEX` in less than `1 hour`.

Notes on the experience:

* It was very smooth
* It make very few mistakes (so far)
* It was very fast to open the PRs
* Open PRs on github with MCP is a killer feature
* I had some issues in parallel tasks, since some tasks was not done, I wish there was better way to describe dependencies.
* Codex got me the frontend, backend and database using docker-compose
* Offcourse I knew what I wanted and what I was doing.
* You can see all PRs here: https://github.com/diegopacheco/codex-poc/pulls?q=is%3Apr+is%3Aclosed

### Results

