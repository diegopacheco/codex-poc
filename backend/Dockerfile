FROM golang:1.23-alpine AS build
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o /out/app

FROM alpine
WORKDIR /app
RUN apk add --no-cache ca-certificates
COPY --from=build /out/app ./app
ENV DB_DSN=root:password@tcp(db:3306)/coaching?charset=utf8mb4&parseTime=True&loc=Local
EXPOSE 8080
CMD ["./app"]
