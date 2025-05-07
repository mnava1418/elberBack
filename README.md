##Crear una imagen en docker
docker build -t <tu-imagen> .

##Crear un contenedor en docker
docker run --network elber_default --name elber-user-services -p 4040:4040 elber/user/services

##DOCKER Compose
docker compose  -f docker-elber.yml up -d

##Run project as nodemon
ts-node-dev --respawn --transpile-only

##Services Ports
api-gateway: 4040
auth-services: 4041
ai-services: 4042
weather-services: 4043