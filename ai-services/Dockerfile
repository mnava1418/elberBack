# Usar una imagen base de Node.js
FROM node:16

# Establecer el directorio de trabajo
WORKDIR /usr/src/elber

# Copiar los proyectos locales
COPY ./ai-services/package*.json ./ai-services/
COPY ./ai-services/tsconfig.json ./ai-services/

# Instalar las dependencias de ambos proyectos
RUN cd ./ai-services && npm install

# Instalar globalmente ts-node y typescript
RUN npm install -g ts-node typescript

# Copiar el resto de los archivos de los proyectos
COPY ./ai-services/ ./ai-services/

# Copiar credenciales
COPY ./creds/ ./ai-services/creds/

# Exponer el puerto en el que tu aplicación estará escuchando
EXPOSE 4042

# Comando para ejecutar la aplicación
CMD ["ts-node", "/usr/src/elber/ai-services/src/bin/www.ts"]
