# Usar una imagen base de Node.js
FROM node:latest as build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos de la aplicación al contenedor
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Compilar la aplicación de Angular
RUN npm run build --prod

# Configurar el servidor HTTP para servir la aplicación compilada
FROM nginx:latest
COPY --from=0 /usr/src/app/dist/wave-breaker /usr/share/nginx/html

# Exponer el puerto en el que se ejecutará la aplicación (por defecto, el puerto 80 de nginx)
EXPOSE 8080

# Comando para iniciar el servidor nginx
CMD ["nginx", "-g", "daemon off;"]
