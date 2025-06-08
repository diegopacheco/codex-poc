# Coaching 

A Simple Team Coaching App.

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
- `POST /teams`
- `GET /teams`
- `POST /assignments`
- `POST /feedbacks`
- `GET /feedbacks`
- `GET /members/{id}/feedbacks`
