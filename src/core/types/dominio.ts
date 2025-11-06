export interface Usuario {
    id: string;
    email: string;
    nombre: string;
    fechaRegistro: Date;
}

export interface ProgresoGlobal {
    usuarioId: string;
    categoriasCompletadas: string[];
    leccionesCompletadas: string[];
    actividadesCompletadas: string[];
    ejerciciosResueltos: string[];
    puntuacionTotal: number;
    poemasColeccionados: string[];
    logrosDesbloqueados: string[];
    ultimaActividad: Date;
}

export interface EjercicioBase {
    id: string;
    tipo: 'seleccion_multiple' | 'completar_espacios' | 'respuesta_numerica' | 'arrastrar_soltar' | 'texto_libre';
    pregunta: string;
    respuestaCorrecta: string | number | string[];
    pistaPoetica: string;
    explicacionIncorrecto: string;
    sugerencia?: string;
    metadata?: Record<string, any>;
}

export interface EjercicioConcreto extends EjercicioBase {
    actividadId: string;
    orden: number;
    dificultad: 'facil' | 'medio' | 'dificil';
    tiempoEstimado: number;
}

export interface Actividad {
    id: string;
    leccionId: string;
    titulo: string;
    objetivo: string;
    descripcion: string;
    orden: number;
    ejercicios: EjercicioConcreto[];
    metadata: {
        tipo: 'practica' | 'evaluacion' | 'refuerzo';
        requiereCompletarAnterior: boolean;
    };
}

export interface Leccion {
    id: string;
    categoriaId: string;
    titulo: string;
    descripcion: string;
    orden: number;
    actividades: Actividad[];
    poemaRecompensa: string;
    metadata: {
        icono: string;
        color: string;
        duracionEstimada: number;
    };
}

export interface Categoria {
    id: string;
    titulo: string;
    descripcion: string;
    año: number;
    orden: number;
    lecciones: Leccion[];
    poemaEpico: string;
    metadata: {
        color: string;
        icono: string;
        desbloqueado: boolean;
        requisitos: string[];
    };
}