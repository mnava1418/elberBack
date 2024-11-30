##Crear una imagen en docker
docker build -t <tu-imagen> .

##Crear un contenedor en docker
docker run --network elber_default --name elber-user-services -p 4040:4040 elber/user/services

##DOCKER Compose
docker-compose  -f docker-elber.yml up

##Run project as nodemon
ts-node-dev --respawn --transpile-only