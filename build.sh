#!/bin/bash
IMAGE_NAME="skumar/divvy"
CONTAINER_NAME="divvy-express-app"

docker rm -f $CONTAINER_NAME || true
docker rmi $IMAGE_NAME || true
docker build -t $IMAGE_NAME .

docker run -d --restart always --name $CONTAINER_NAME -p 3000:3000 $IMAGE_NAME