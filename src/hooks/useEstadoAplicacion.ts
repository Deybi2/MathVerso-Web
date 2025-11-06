import { useState, useEffect, useCallback } from 'react';
import type { EstadoAplicacion, Usuario, ProgresoUsuario, type Categoria } from '../core/types/dominio';
import { usePocketBase } from './usePocketBase';

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
        const progresoGuardado = await pb.collection('progreso_usuarios').getFirstListItem(`usuario="${usuario.id}"`);
        setEstado(prev => ({ ...prev, progreso: progresoGuardado }));
        } catch (error) {
        // Crear progreso inicial si no existe
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
            id: ''
        };
        
        try {
            const record = await pb.collection('progreso_usuarios').create(nuevoProgreso);
            setEstado(prev => ({ ...prev, progreso: record }));
        } catch (createError) {
            console.error('Error creando progreso:', createError);
        }
    };

    cargarProgreso();
    }, [usuario, pb]);

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

    const nuevoProgreso = {
        ...estado.progreso,
        ejerciciosResueltos: [...estado.progreso.ejerciciosResueltos, ejercicioId],
        puntuacionTotal: estado.progreso.puntuacionTotal + (esCorrecto ? 10 : 1),
        ultimaActividad: new Date()
    };

    // Actualizar en PocketBase
    try {
        await pb.collection('progreso_usuarios').update(estado.progreso.id, nuevoProgreso);
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