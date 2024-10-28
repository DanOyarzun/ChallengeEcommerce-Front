import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const irAlLogin = () => {
    navigate("/login");
  };

  const irAlRegistro = () => {
    navigate("/registrarse");
  };

  const irAProductos = () => {
    navigate("/productos");
  };

  const cerrarSesion = () => {
    // Aquí puedes agregar la lógica para cerrar sesión, como eliminar el token del localStorage
    localStorage.removeItem("token"); // Eliminar el token del localStorage
    setIsAuthenticated(false); // Actualizar el estado de autenticación
    navigate("/"); // Redirigir a la página de inicio
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">
        Bienvenido a <strong>TodoCompras</strong>
      </h1>
      {!isAuthenticated ? (
        <div className="flex space-x-4">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-200"
            onClick={irAlRegistro}
          >
            Registrarse
          </button>
          <button
            className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition duration-200"
            onClick={irAlLogin}
          >
            Iniciar sesión
          </button>
        </div>
      ) : (
        <div className="flex space-x-4">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-200"
            onClick={irAProductos}
          >
            Productos
          </button>
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition duration-200"
            onClick={cerrarSesion}
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;

