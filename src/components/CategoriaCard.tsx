import React from 'react';
import { type Categoria } from '../core/types/dominio';
import { useNavigate } from 'react-router-dom';

interface Props {
    categoria: Categoria;
}

const CategoriaCard: React.FC<Props> = ({ categoria }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/categoria/${categoria.id}`);
    };

    return (
        <div
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer p-6 border-l-4"
        style={{ borderLeftColor: categoria.metadata.color }}
        onClick={handleClick}
        >
        <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">{categoria.metadata.icono}</span>
            <h3 className="text-xl font-bold text-gray-800">{categoria.titulo}</h3>
        </div>
        
        <p className="text-gray-600 mb-4">{categoria.descripcion}</p>
        
        <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
                {categoria.lecciones.length} lecciones
            </span>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Explorar
            </button>
        </div>
    </div>
    );
};

export default CategoriaCard;