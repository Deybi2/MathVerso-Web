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
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
        Crear cuenta
      </h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
