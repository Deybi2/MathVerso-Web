import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import "./App.css";
import Bienvenida from "./pages/Bienvenida";
import MapaPrincipal from "./pages/MapaPrincipal";
import Login from "./pages/InicioDeSesion";
import Register from "./pages/Registro";
import Navbar from "./components/BarraDeNavegacion";
import { usePocketBase } from "./hooks/usePocketBase";

// Componente para proteger rutas
const RutaProtegida = ({ children }: { children: JSX.Element }) => {
  const { usuario } = usePocketBase();
  return usuario ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Bienvenida />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mapa" element={
            <RutaProtegida>
              <MapaPrincipal />
            </RutaProtegida>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
