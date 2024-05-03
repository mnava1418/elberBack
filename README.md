##Crear una imagen en docker
docker build -t <tu-imagen> .

##Crear un contenedor en docker
docker run --network dot_default --name dot-user-services -p 4040:4040 dot/user/services

##DOCKER Compose
docker-compose  -f docker-dot.yml up