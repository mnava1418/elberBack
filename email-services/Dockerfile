# Usar una imagen base de Node.js
FROM node:16

# Establecer el directorio de trabajo
WORKDIR /usr/src/elber

# Copiar los proyectos locales
COPY ./email-services/package*.json ./email-services/
COPY ./kafka-services/package*.json ./kafka-services/

# Instalar las dependencias de ambos proyectos
RUN cd ./kafka-services && npm install
RUN cd ./email-services && npm install

# Copiar el resto de los archivos de los proyectos
COPY ./email-services/ ./email-services/
COPY ./kafka-services/ ./kafka-services/

# Copiar credenciales
COPY ./creds/ ./email-services/creds/

# Establecer variables de entorno si es necesario

# Comando para ejecutar la aplicación
CMD ["node", "/usr/src/elber/email-services/src/app.js"]
