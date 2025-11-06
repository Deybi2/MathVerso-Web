import { usePocketBase } from '../hooks/usePocketBase';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { usuario, pb } = usePocketBase();
  const navigate = useNavigate();
  const location = useLocation();

  // No mostrar la barra de navegación en la página de bienvenida
  if (location.pathname === '/') {
    return null;
  }

  const cerrarSesion = () => {
    pb.authStore.clear();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-800">MathVerso</h1>
            </div>
          </div>
          <div className="flex items-center">
            {usuario ? (
              <>
                <span className="text-gray-700 mr-4">{usuario.email}</span>
                <button
                  onClick={cerrarSesion}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
