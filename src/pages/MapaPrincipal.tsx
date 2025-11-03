import React from "react";
import { categorias } from "../data/categorias";
import CategoriaCard from "../../src/components/CategoriaCard";

const MapaPrincipal: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-6 sm:px-10">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-3">
          Matemáticas en Verso
        </h1>
        <p className="text-lg text-gray-600">
          Forjá tu camino a través del conocimiento técnico
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {categorias.map((categoria) => (
          <CategoriaCard key={categoria.id} categoria={categoria} />
        ))}
      </div>
    </div>
  );
};

export default MapaPrincipal;
