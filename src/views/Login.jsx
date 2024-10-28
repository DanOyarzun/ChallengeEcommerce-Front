import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        navigate("/productos");
      } else {
        setError(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      setError("Error en el servidor");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-center mb-4">
          <img
            src="../src/assets/img/logo-ecommerce-1.png"
            className="w-24"
            alt="Logo"
          />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">Iniciar sesión</h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={loginIn}>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contraseña:</label>
            <input
              type="password"
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg w-full hover:bg-blue-500 transition duration-200"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
