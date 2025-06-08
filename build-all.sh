#!/bin/sh
set -e
cd "$(dirname "$0")"
./build.sh
./build-frontend.sh
docker compose build
