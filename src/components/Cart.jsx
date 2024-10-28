import React, { useEffect, useState } from "react";
import useCartStore from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, addToCart, loadCartFromStorage } =
    useCartStore();
  const navigate = useNavigate();
  
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    loadCartFromStorage();
  }, []);

  const triggerPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const increaseQuantity = (product) => {
    const updatedProduct = { ...product, quantity: 1 };
    addToCart(updatedProduct);
    triggerPopup(`"${product.nombre}" añadido al carrito`);
  };

  const decreaseQuantity = (productId) => {
    const product = cart.find((item) => item.id === productId);
    if (product.quantity > 1) {
      const updatedProduct = { ...product, quantity: -1 };
      addToCart(updatedProduct);
    } else {
      removeFromCart(productId);
    }
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.precio * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Tu Carrito de Compras
        </h2>
        
        {showPopup && (
          <div className="fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
            {popupMessage}
          </div>
        )}

        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <div className="text-gray-500 mb-6">Tu carrito está vacío</div>
            <button
              onClick={() => navigate("/productos")}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Explorar Productos
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src={item.foto_de_producto}
                      alt={item.nombre}
                      className="w-24 h-24 object-cover rounded-lg shadow-sm"
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900">{item.nombre}</h3>
                      <p className="text-gray-600 mt-1">${item.precio}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-600 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600">Total</span>
                <span className="text-2xl font-bold text-gray-900">${getTotalPrice()}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/productos")}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Seguir Comprando
                </button>
                <button
                  onClick={() => navigate("/checkout")}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Proceder al Pago
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
