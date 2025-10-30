import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/InicioDeSesion";
import Register from "./pages/Registro";
import Navbar from "./components/BarraDeNavegacion";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
