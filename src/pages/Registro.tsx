import { useState } from "react";
import { pb } from "../lib/pocketbase";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      await pb.collection("users").create({
        email,
        password,
        passwordConfirm,
      });
      alert("Registro exitoso. Ahora inicia sesión.");
      navigate("/login");
    } catch (err: any) {
      setError("Error al registrarse. Verifique los datos.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 px-4">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-2xl shadow-lg p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          Crear cuenta
        </h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-all"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
