#!/bin/bash

source ./import_env.sh

docker run -d -p 49152:80 --name "$DOCKER_PROJECT_NAME-container" "$DOCKER_PROJECT_NAME"
