# Dockerfile

# --- ETAPA 1: EL CONSTRUCTOR ---
# Usamos una imagen oficial de Node.js v20. "alpine" es una versión de Linux muy ligera.
FROM node:20-alpine AS builder

# Establecemos el directorio de trabajo dentro del contenedor.
WORKDIR /app

# Copiamos solo los archivos de dependencias para usar el caché de Docker y acelerar builds futuros.
COPY package*.json ./

# Instalamos las dependencias.
# Es posible que necesites --legacy-peer-deps si hay conflictos, pero probemos sin él primero.
RUN npm install

# Copiamos el resto del código fuente de nuestra aplicación.
COPY . .

# Compilamos la aplicación Vite para producción.
# Esto ejecutará "vite build" (según tu package.json) y creará la carpeta "dist".
RUN npm run build

# --- ETAPA 2: EL EJECUTOR ---
# Empezamos desde una nueva imagen limpia para que el resultado final sea pequeño y seguro.
FROM node:20-alpine

WORKDIR /app

# Copiamos los artefactos necesarios desde la etapa "builder".
# Para Vite, el resultado de la compilación está en "dist", no en ".next".
COPY --from=builder /app/dist ./dist

# Aún necesitamos node_modules y package.json para ejecutar el comando "npm run preview".
# (vite es una dependencia necesaria para "vite preview").
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# La carpeta "public" ya se incluye en la carpeta "dist" durante el build de Vite,
# por lo que no es necesario copiarla por separado.

# Exponemos el puerto 3000 para que el contenedor pueda recibir tráfico.
# Vite preview por defecto usa el puerto 4173, pero lo forzaremos al 3000.
EXPOSE 3000

# El comando que se ejecutará para iniciar la aplicación cuando el contenedor arranque.
# Usamos "npm run preview" que ejecuta "vite preview".
# Añadimos "-- --host --port 3000" para forzar que se ejecute en el puerto 3000,
# sea accesible desde fuera del contenedor (--host) y coincida con el EXPOSE.
# (El "--" es necesario para pasar argumentos al script de npm).
CMD ["npm", "run", "preview", "--", "--host", "--port", "3000"]
