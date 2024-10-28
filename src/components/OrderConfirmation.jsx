import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails } = location.state || {};

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No se encontró información del pedido</h2>
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Cabecera con animación */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="mx-auto h-24 w-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mb-8 shadow-lg">
            <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">¡Gracias por tu compra!</h2>
          <p className="text-xl text-gray-600">Tu pedido ha sido procesado exitosamente</p>
        </div>

        {/* Contenedor principal */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Detalles del pedido */}
          <div className="p-8 border-b border-gray-100 animate-fade-in" style={{animationDelay: '0.1s'}}>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Detalles del pedido</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-xl p-6 transform transition hover:scale-105">
                <p className="text-sm text-blue-600 mb-2">Número de pedido</p>
                <p className="text-lg font-semibold text-gray-800">{orderDetails.orderId}</p>
              </div>
              <div className="bg-green-50 rounded-xl p-6 transform transition hover:scale-105">
                <p className="text-sm text-green-600 mb-2">Total</p>
                <p className="text-lg font-semibold text-gray-800">${orderDetails.total.toFixed(2)}</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 transform transition hover:scale-105">
                <p className="text-sm text-purple-600 mb-2">Fecha</p>
                <p className="text-lg font-semibold text-gray-800">{orderDetails.date}</p>
              </div>
            </div>
          </div>

          {/* Dirección de envío */}
          <div className="p-8 border-b border-gray-100 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Dirección de envío</h3>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-800">{orderDetails.shippingDetails.nombre}</p>
                <p className="text-gray-600">{orderDetails.shippingDetails.direccion}</p>
                <p className="text-gray-600">
                  {orderDetails.shippingDetails.ciudad}, {orderDetails.shippingDetails.codigoPostal}
                </p>
              </div>
            </div>
          </div>

          {/* Productos */}
          {orderDetails.items && orderDetails.items.length > 0 && (
            <div className="p-8 animate-fade-in" style={{animationDelay: '0.3s'}}>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Productos</h3>
              <div className="space-y-4">
                {orderDetails.items.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      {item.imagen && (
                        <img 
                          src={item.imagen} 
                          alt={item.nombre} 
                          className="h-16 w-16 object-cover rounded-lg"
                        />
                      )}
                      <div>
                        <p className="font-medium text-gray-800">{item.nombre}</p>
                        <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-800">${(item.precio * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Botón de volver */}
        <div className="text-center mt-12 animate-fade-in" style={{animationDelay: '0.4s'}}>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
