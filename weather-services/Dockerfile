# Usar una imagen base de Node.js
FROM node:16

# Establecer el directorio de trabajo
WORKDIR /usr/src/elber

# Copiar los proyectos locales
COPY ./weather-services/package*.json ./weather-services/
COPY ./weather-services/tsconfig.json ./weather-services/
COPY ./common-services/package*.json ./common-services/
COPY ./common-services/tsconfig.json ./common-services/

# Instalar las dependencias de ambos proyectos
RUN cd ./common-services && npm install
RUN cd ./weather-services && npm install

# Instalar globalmente ts-node y typescript
RUN npm install -g ts-node typescript

# Copiar el resto de los archivos de los proyectos
COPY ./weather-services/ ./weather-services/
COPY ./common-services/ ./common-services/

# Copiar credenciales
COPY ./creds/ ./weather-services/creds/

# Exponer el puerto en el que tu aplicación estará escuchando
EXPOSE 4043

# Comando para ejecutar la aplicación
CMD ["ts-node", "/usr/src/elber/weather-services/src/bin/www.ts"]
