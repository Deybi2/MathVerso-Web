#!/bin/bash
set -e # Si un comando falla, el script se detiene.

# --- ADAPTACIÓN ---
# Cambia esto al nombre que quieras para tu imagen de Docker.
IMAGE_NAME="mathverso-web"
# --- FIN DE ADAPTACIÓN ---

echo ">>> Obteniendo la última versión del código desde GitHub (rama main)..."
# Asegúrate de que 'main' sea tu rama principal
git pull origin main

echo ">>> Guardando la imagen actual como respaldo (${IMAGE_NAME}:previous)..."
# Si falla (ej. en la primera build), "|| true" evita que el script se detenga.
docker tag ${IMAGE_NAME}:latest ${IMAGE_NAME}:previous || true

echo ">>> Construyendo la nueva imagen de Docker (${IMAGE_NAME}:latest)..."
# Esto usará el 'Dockerfile' en la carpeta actual.
docker build -t ${IMAGE_NAME}:latest .

echo " ¡Nueva imagen construida con éxito: ${IMAGE_NAME}:latest!"

echo ""
echo "--- Próximos pasos sugeridos ---"
echo "Para detener y eliminar el contenedor anterior (si existe):"
echo "  docker stop ${IMAGE_NAME} && docker rm ${IMAGE_NAME}"
echo ""
echo "Para ejecutar el nuevo contenedor:"
echo "  docker run -d -p 3000:3000 --name ${IMAGE_NAME} ${IMAGE_NAME}:latest"
echo ">>> Deteniendo y eliminando el contenedor anterior (si existe)..."
docker stop ${IMAGE_NAME} || true
docker rm ${IMAGE_NAME} || true

echo ">>> Ejecutando el nuevo contenedor..."
docker run -d -p 3000:3000 --name ${IMAGE_NAME} ${IMAGE_NAME}:latest

echo "¡Despliegue completado! ${IMAGE_NAME} está corriendo en http://localhost:3000"

Esto haría que tu script `build.sh` actualice, construya y también reinicie el contenedor automáticamente.
