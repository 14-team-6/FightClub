#!/bin/bash

# script to local docker deploy
# doesn't work on heroku / github / etc
# only for testing purposes!

echo "Build new image..."
docker build . -t fc_tmp

echo "Rename current container..."
docker rename fc fc_old

echo "Stop current container..."
docker stop fc_old

echo "Run new container..."
docker run -d -e PORT=3000 -p 3000:3000 --name fc fc_tmp

echo "Clean old container and image..."
docker tag fc fc_old
docker tag fc_tmp fc

docker rm -f fc_old
docker rmi -f fc_old
