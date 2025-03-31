#!/bin/bash

docker compose -p=front-shezlonger build && docker compose -p=front-shezlonger up -d
docker exec -it backend_php_fpm npm i
#docker exec -it backend_php_fpm npm run build
