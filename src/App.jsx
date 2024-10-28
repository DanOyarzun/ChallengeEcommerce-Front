import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Products from "./views/Products";
import CartPage from "./pages/CartPage";
import Checkout from "./components/Checkout";
import OrderConfirmation from './components/OrderConfirmation';  // No desde views
import "../src/App.css";

// Importa Elements y loadStripe desde Stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Inicializa Stripe con tu clave pública
const stripePromise = loadStripe("tu_clave_publica_de_stripe");

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/registrarse" element={<Register />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route
          path="/checkout"
          element={
            isAuthenticated ? (
              // Envolver Checkout dentro de Elements para habilitar el contexto de Stripe
              <Elements stripe={stripePromise}>
                <Checkout />
              </Elements>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/order-confirmation"
          element={
            isAuthenticated ? <OrderConfirmation /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </>
  );
};

export default App;
