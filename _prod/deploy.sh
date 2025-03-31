#!/bin/bash

cd ../
git pull
sudo rm -rf /home/web-service/shizlong-app/dist
docker exec -it front_nginx npm i --legacy-peer-deps
docker exec -it front_nginx npm run build
