import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white py-3 px-6 flex justify-between items-center">
      <h1 className="text-lg font-bold">MathVerso</h1>
      <div className="flex gap-4">
        <Link to="/" className="hover:text-gray-200">
          Inicio
        </Link>
        <Link to="/login" className="hover:text-gray-200">
          Login
        </Link>
        <Link to="/register" className="hover:text-gray-200">
          Registro
        </Link>
      </div>
    </nav>
  );
}
