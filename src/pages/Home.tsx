import { pb } from "../lib/pocketbase";

export default function Home() {
  const user = pb.authStore.model;

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">
        Bienvenido a MathVerso
      </h1>
      {user ? (
        <>
          <p className="text-gray-700">Hola, {user.email}</p>
          <button
            onClick={() => pb.authStore.clear()}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Cerrar sesión
          </button>
        </>
      ) : (
        <p className="text-gray-600">Iniciá sesión para continuar</p>
      )}
    </div>
  );
}
