# Usar una imagen base de Node.js
FROM node:16

# Establecer el directorio de trabajo
WORKDIR /usr/src/elber

# Copiar los proyectos locales
COPY ./api-gateway/package*.json ./api-gateway/
COPY ./api-gateway/tsconfig.json ./api-gateway/
COPY ./common-services/package*.json ./common-services/
COPY ./common-services/tsconfig.json ./common-services/

# Instalar las dependencias de ambos proyectos
RUN cd ./common-services && npm install
RUN cd ./api-gateway && npm install

# Instalar globalmente ts-node y typescript
RUN npm install -g ts-node typescript

# Copiar el resto de los archivos de los proyectos
COPY ./api-gateway/ ./api-gateway/
COPY ./common-services/ ./common-services/

# Copiar credenciales
COPY ./creds/ ./api-gateway/creds/

# Exponer el puerto en el que tu aplicación estará escuchando
EXPOSE 4040

# Comando para ejecutar la aplicación
CMD ["ts-node", "/usr/src/elber/api-gateway/src/bin/www.ts"]
