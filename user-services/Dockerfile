# Usar una imagen base oficial de Node.js como punto de partida
FROM node:16

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/userServices

# Copiar los archivos de definición de dependencias al directorio de trabajo
COPY package*.json ./

# Copiar credenciales
COPY ./creds/* ./usr/src/userServices/creds

# Instalar las dependencias del proyecto
RUN npm install

# Copiar los archivos del proyecto al directorio de trabajo
COPY . .

# Exponer el puerto que tu aplicación usará
EXPOSE 4040

# Definir el comando para ejecutar la aplicación
CMD ["node", "./src/bin/www"]
