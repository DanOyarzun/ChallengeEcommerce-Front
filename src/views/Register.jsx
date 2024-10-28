import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        // Redirigir al componente de inicio de sesión después de un registro exitoso
        setTimeout(() => {
          navigate('/login'); // Cambia '/login' según la ruta de tu componente Login
        }, 2000); // Espera 2 segundos antes de redirigir
      } else {
        setError(data.message || "Error al registrar el usuario");
      }
    } catch (error) {
      setError("Error en el servidor");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Registrarse</h2>
        {error && <p className="text-danger">{error}</p>}
        {successMessage && <p className="text-success">{successMessage}</p>}
        <form onSubmit={registerUser}>
          <div className="mb-3">
            <label className="form-label">Nombre:</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
