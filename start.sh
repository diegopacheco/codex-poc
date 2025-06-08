#!/bin/sh
set -e
cd "$(dirname "$0")"
# ensure database directory exists so MySQL data persists
DATA_DIR="$(pwd)/mysql_data"
mkdir -p "$DATA_DIR"
MYSQL_DATA_DIR="$DATA_DIR" docker compose up -d --build
