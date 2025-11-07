#!/bin/bash
set -e # Si un comando falla, el script se detiene.

# --- ADAPTACIÓN ---
# Usamos los nombres definidos en el script build.sh
CONTAINER_NAME="mathverso-web"
IMAGE_NAME="mathverso-web"
# Puerto interno y externo de la aplicación
PORT="3000"
SERVER_IP="10.56.2.17"
# --- FIN DE ADAPTACIÓN ---

echo ">>> Buscando y deteniendo el contenedor antiguo: ${CONTAINER_NAME}..."
# Verifica si existe un contenedor con el nombre especificado y lo detiene/elimina
if [ "$(docker ps -a -q -f name=^/${CONTAINER_NAME}$)" ]; then
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
    echo "    Contenedor antiguo detenido y eliminado."
else
    echo "    No se encontró contenedor antiguo para eliminar."
fi

echo ">>> Lanzando un nuevo contenedor: ${CONTAINER_NAME}..."
# Inicia el nuevo contenedor:
# -d: Modo desatendido (detached)
# -p ${PORT}:${PORT}: Mapea el puerto ${PORT} (3000) del host al puerto ${PORT} del contenedor.
# --name: Asigna el nombre al nuevo contenedor.
# --restart always: Asegura que el contenedor se reinicie automáticamente si falla.
docker run -d \
    -p ${PORT}:${PORT} \
    --name $CONTAINER_NAME \
    --restart always \
    ${IMAGE_NAME}:latest

echo " ¡Aplicación desplegada con éxito!"
echo " Puedes acceder a la aplicación en http://${SERVER_IP}:${PORT}"
