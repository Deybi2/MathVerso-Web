import { usePocketBase } from '../hooks/usePocketBase';
import { useNavigate } from 'react-router-dom';

export default function Bienvenida() {
    const { usuario } = usePocketBase();
    const navigate = useNavigate();

  // Si el usuario está logueado, redirigir al mapa
    if (usuario) {
        navigate('/mapa');
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 px-4">
        <div className="text-center">
            <h1 className="text-5xl font-bold text-indigo-700 mb-6">
            Bienvenido a MathVerso
            </h1>
            <p className="text-gray-600 text-lg mb-8">
                Descubre el mundo de las matemáticas a través de la poesía y el juego.
            </p>
            <div className="space-y-4">
            <button
                onClick={() => navigate('/login')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-all"
            >
                Iniciar Sesión
            </button>
            <button
                onClick={() => navigate('/register')}
                className="w-full bg-white hover:bg-gray-100 text-indigo-600 border border-indigo-600 py-3 rounded-lg font-semibold transition-all"
            >
            Registrarse
            </button>
        </div>
        </div>
    </div>
    );
}