#!/bin/sh
set -e
cd "$(dirname "$0")/backend"
go build -o app
