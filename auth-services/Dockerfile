# Usar una imagen base de Node.js
FROM node:16

# Establecer el directorio de trabajo
WORKDIR /usr/src/elber

# Copiar los proyectos locales
COPY ./auth-services/package*.json ./auth-services/
COPY ./kafka-services/package*.json ./kafka-services/
COPY ./common-services/package*.json ./common-services/
COPY ./common-services/tsconfig.json ./common-services/

# Instalar las dependencias de ambos proyectos
RUN cd ./common-services && npm install
RUN cd ./kafka-services && npm install
RUN cd ./auth-services && npm install

# Copiar el resto de los archivos de los proyectos
COPY ./auth-services/ ./auth-services/
COPY ./kafka-services/ ./kafka-services/
COPY ./common-services/ ./common-services/

# Copiar credenciales
COPY ./creds/ ./auth-services/creds/

# Exponer el puerto en el que tu aplicación estará escuchando
EXPOSE 4041

# Comando para ejecutar la aplicación
CMD ["node", "/usr/src/elber/auth-services/src/bin/www"]
