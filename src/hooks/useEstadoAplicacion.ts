import { useState, useEffect, useCallback } from 'react';
import type { EstadoAplicacion, Usuario, ProgresoUsuario, Categoria } from '../core/types/dominio';
import { usePocketBase } from './usePocketBase';
import { RecordModel } from 'pocketbase';

const mapearProgreso = (record: RecordModel): ProgresoUsuario => ({
    id: record.id,
    usuarioId: record.usuario,
    categoriasCompletadas: record.categoriasCompletadas ?? [],
    leccionesCompletadas: record.leccionesCompletadas ?? [],
    actividadesCompletadas: record.actividadesCompletadas ?? [],
    ejerciciosResueltos: record.ejerciciosResueltos ?? [],
    puntuacionTotal: record.puntuacionTotal ?? 0,
    poemasColeccionados: record.poemasColeccionados ?? [],
    logrosDesbloqueados: record.logrosDesbloqueados ?? [],
    ultimaActividad: new Date(record.ultimaActividad)
});


export const useEstadoAplicacion = () => {
    const { usuario, pb } = usePocketBase();
    const [estado, setEstado] = useState<EstadoAplicacion>({
        usuario: usuario ? {
            id: usuario.id,
            email: usuario.email,
            nombre: usuario.name || usuario.email.split('@')[0],
            fechaRegistro: new Date(usuario.created)
        } : null,
        progreso: null,
        categoriaActual: null,
        leccionActual: null,
        actividadActual: null,
        ejercicioActual: null,
        modales: {
            nivelCompletado: false,
            leccionCompletada: false,
            categoriaCompletada: false
        }
    });

    // Cargar progreso del usuario
    useEffect(() => {
        const cargarProgreso = async () => {
            if (!usuario) return;

            try {
                // Intentar cargar progreso desde PocketBase
                // Nota: Asumo que 'progreso_usuarios' tiene una relación uno a uno con 'usuario'
                const progresoGuardado = await pb.collection('progreso_usuarios').getFirstListItem(`usuario="${usuario.id}"`);
                setEstado(prev => ({
                    ...prev,
                    progreso: mapearProgreso(progresoGuardado)
                }));

            } catch (error) {
                // Si el error indica que el registro no fue encontrado (ej. 404), creamos uno nuevo
                if (error instanceof Error && 'status' in error && error.status === 404) {
                    const nuevoProgreso: ProgresoUsuario = {
                        usuarioId: usuario.id,
                        categoriasCompletadas: [],
                        leccionesCompletadas: [],
                        actividadesCompletadas: [],
                        ejerciciosResueltos: [],
                        puntuacionTotal: 0,
                        poemasColeccionados: [],
                        logrosDesbloqueados: [],
                        ultimaActividad: new Date(),
                        id: '' // El ID será generado por PocketBase al crear
                    };
                    
                    try {
                        const record = await pb.collection('progreso_usuarios').create(nuevoProgreso);
                        setEstado(prev => ({
                            ...prev,
                            progreso: record as unknown as ProgresoUsuario }));
                    } catch (createError) {
                        console.error('Error creando progreso:', createError);
                    }
                } else {
                     console.error('Error cargando progreso inesperado:', error);
                }
            }
        };

        cargarProgreso();
    }, [usuario, pb]); // <<-- ESTA ES LA LÍNEA CORREGIDA (Línea 59)

    const establecerCategoriaActual = useCallback((categoria: Categoria) => {
        setEstado(prev => ({ ...prev, categoriaActual: categoria }));
    }, []);

    const completarEjercicio = useCallback(async (
        ejercicioId: string, 
        esCorrecto: boolean, 
        // actividadId: string,
        // leccionId: string,
        // categoriaId: string
    ) => {
        if (!estado.progreso || !estado.usuario) return;

        // Clonar y actualizar el progreso localmente
        const nuevoProgreso: ProgresoUsuario = {
            ...estado.progreso,
            ejerciciosResueltos: [...estado.progreso.ejerciciosResueltos, ejercicioId],
            puntuacionTotal: estado.progreso.puntuacionTotal + (esCorrecto ? 10 : 1),
            ultimaActividad: new Date()
        };

        // Actualizar en PocketBase
        try {
            await pb.collection('progreso_usuarios').update(estado.progreso.id, nuevoProgreso);
            
            // Actualizar estado local después de la actualización exitosa
            setEstado(prev => ({
                ...prev,
                progreso: nuevoProgreso,
                modales: esCorrecto ? {
                    ...prev.modales,
                    nivelCompletado: true
                } : prev.modales
            }));
        } catch (error) {
            console.error('Error actualizando progreso:', error);
        }
    }, [estado, pb]);

    const cerrarModal = useCallback((modal: keyof EstadoAplicacion['modales']) => {
        setEstado(prev => ({
            ...prev,
            modales: {
                ...prev.modales,
                [modal]: false
            }
        }));
    }, []);

    return {
        estado,
        acciones: {
            establecerCategoriaActual,
            completarEjercicio,
            cerrarModal
        }
    };
};