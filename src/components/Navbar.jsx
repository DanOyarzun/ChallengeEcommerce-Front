import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { searchSuggestions } from "../services/api";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Agregar este estado
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length >= 2) {
      try {
        const data = await searchSuggestions(query);
        setSuggestions(data?.productos || []); // Aseguramos que siempre sea un array
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error al obtener sugerencias:", error);
        setSuggestions([]); // En caso de error, establecemos un array vacío
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (producto) => {
    setSearchQuery(producto.nombre);
    setShowSuggestions(false);
    navigate(`/productos?buscar=${encodeURIComponent(producto.nombre)}`);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/productos?buscar=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav id="header" className="w-full z-30 top-0 py-1 bg-white shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-6 py-3">
        
        {/* Logo */}
        <NavLink className="flex items-center order-1 md:order-2" to="/">
          <img
            src="src/assets/img/logo-ecommerce.png"
            alt="Logo-TodoCompras"
            className="w-12 h-12 mr-2"
          />
          <span className="text-xl font-bold text-gray-800">TodoCompras</span>
        </NavLink>

        {/* Botón de hamburguesa */}
        <button
          className="lg:hidden text-gray-800 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="text-2xl">&#9776;</span>
        </button>

        {/* Menú desplegable en pantallas pequeñas */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:flex lg:items-center lg:w-auto w-full order-3 lg:order-1`}
          id="menu"
        >
          <nav>
            <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0 space-y-4 lg:space-y-0 lg:space-x-4">
              {/* Barra de búsqueda */}
              <li className="w-full md:w-auto">
                <form onSubmit={handleSearchSubmit}>
                  <div ref={searchContainerRef} className="relative flex items-center">
                    <input
                      type="search"
                      placeholder="Buscar productos..."
                      className="w-full px-4 py-2 pr-10 border rounded-lg"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <button
                      type="submit"
                      className="absolute right-2 p-2 text-gray-600 hover:text-gray-800"
                      aria-label="Buscar"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                    {showSuggestions && suggestions && suggestions.length > 0 && (
                      <div className="absolute z-50 w-full mt-1 top-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {suggestions.map((producto) => (
                          <div
                            key={producto.id}
                            className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSuggestionClick(producto)}
                          >
                            <img
                              src={producto.foto_de_producto}
                              alt={producto.nombre}
                              className="w-10 h-10 object-cover rounded"
                            />
                            <div className="ml-2">
                              <div className="text-sm font-medium">{producto.nombre}</div>
                              <div className="text-xs text-gray-500">${producto.precio}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </form>
              </li>

              {/* Links de navegación */}
              {isAuthenticated ? (
                <>
                  <li>
                    <NavLink
                      className="inline-block no-underline hover:text-black hover:underline py-2 px-4"
                      to="/productos"
                    >
                      Productos
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="inline-block no-underline hover:text-black hover:underline py-2 px-4"
                      to="/carrito"
                    >
                      Carrito
                    </NavLink>
                  </li>
                  <li>
                    <Logout setIsAuthenticated={setIsAuthenticated} />
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      className="inline-block no-underline hover:text-black hover:underline py-2 px-4"
                      to="/registrarse"
                    >
                      Registrarse
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="inline-block no-underline hover:text-black hover:underline py-2 px-4"
                      to="/login"
                    >
                      Iniciar sesión
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
