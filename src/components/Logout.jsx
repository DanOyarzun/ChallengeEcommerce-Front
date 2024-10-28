import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    setIsAuthenticated(false);

    navigate("/");
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Cerrar sesión
    </button>
  );
};

export default Logout;
