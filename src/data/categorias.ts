import { type Categoria } from '../core/types/dominio';

export const categorias: Categoria[] = [
    {
        id: 'categoria-1',
        titulo: '1° Año: Fundamentos Cuantitativos',
        descripcion: 'Consolida las bases numéricas y la lógica del pensamiento matemático',
        año: 1,
        orden: 1,
        poemaEpico: `Poema épico para el primer año...`,
        metadata: {
            color: '#3B82F6',
            icono: '🔢',
            desbloqueado: true,
            requisitos: []
        },
        lecciones: [
        {
            id: 'leccion-1-1',
            categoriaId: 'categoria-1',
            titulo: 'Aritmética: Los Números del Taller',
            descripcion: 'Operaciones básicas aplicadas al entorno técnico',
            orden: 1,
            poemaRecompensa: `Poema de recompensa para aritmética...`,
            metadata: {
                icono: '➕',
                color: '#10B981',
                duracionEstimada: 30
            },
            actividades: [
            {
                id: 'actividad-1-1-1',
                leccionId: 'leccion-1-1',
                titulo: 'Sumas que Construyen Puentes',
                objetivo: 'Practicar suma de números enteros en contextos de ingeniería',
                descripcion: '',
                orden: 1,
                metadata: {
                    tipo: 'practica',
                requiereCompletarAnterior: false
                },
                ejercicios: [
                {
                    id: 'ejercicio-1-1-1-1',
                    actividadId: 'actividad-1-1-1',
                    tipo: 'seleccion_multiple',
                    pregunta: 'Un motor requiere 12 tornillos grandes, 15 tuercas medianas y 8 arandelas pequeñas. ¿Cuántas piezas de fijación se necesitan en total?',
                    opciones: ['30', '35', '27', '32'],
                    respuestaCorrecta: '35',
                    pistaPoetica: 'Los tornillos y tuercas, como versos dispersos, se unen en un coro, creando algo inmenso.',
                    explicacionIncorrecto: 'No desesperes, cada parte cuenta. Recuerda que la suma es la unión, el todo. Si juntas 12 con 15 y luego con 8, verás la cifra exacta.',
                    orden: 1,
                    dificultad: 'facil',
                    tiempoEstimado: 30
                }
            ]
            }
        ]
        }
    ]
    }
];