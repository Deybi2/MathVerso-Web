#!/bin/bash
set -e # Si un comando falla, el script se detiene.

# --- ADAPTACIÓN ---
# Nombre de la imagen del proyecto.
IMAGE_NAME="mathverso-web"
# --- FIN DE ADAPTACIÓN ---

echo ">>> Revirtiendo a la imagen anterior (${IMAGE_NAME}:previous)..."
# La imagen :previous se etiqueta como la nueva imagen :latest
# La imagen :latest fallida ahora está disponible para ser eliminada manualmente (si se desea).
docker tag ${IMAGE_NAME}:previous ${IMAGE_NAME}:latest

echo ">>> Redesplegando la versión anterior usando el script deploy.sh..."
# El script deploy.sh detiene el contenedor actual y lo inicia con la nueva etiqueta :latest (que ahora es la anterior).
./deploy.sh

echo " ¡Rollback completado! La aplicación ha vuelto a la versión anterior."
