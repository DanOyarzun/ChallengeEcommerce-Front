import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../context/CartContext';
import Popup from './Popup';

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cart, clearCart } = useCartStore();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showProcessingPopup, setShowProcessingPopup] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    direccion: '',
    ciudad: '',
    codigoPostal: ''
  });
  const [processingMessage, setProcessingMessage] = useState('');
  const [successPopup, setSuccessPopup] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null); // Agregar este estado

  const steps = [
    { number: 1, title: 'Información Personal' },
    { number: 2, title: 'Dirección de Envío' },
    { number: 3, title: 'Método de Pago' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextStep = () => {
    setCurrentStep(current => Math.min(current + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(current => Math.max(current - 1, 1));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (currentStep !== 3) {
      nextStep();
      return;
    }
    
    if (!stripe || !elements) {
      setError('Error con el sistema de pago');
      return;
    }

    if (!formData.nombre || !formData.email || !formData.direccion || 
        !formData.ciudad || !formData.codigoPostal) {
      setError('Por favor complete todos los campos');
      return;
    }

    setLoading(true);
    setError('');
    setShowProcessingPopup(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 6000));
      
      const newOrderDetails = {
        orderId: 'DEMO-' + Math.random().toString(36).substr(2, 9),
        total: getTotalAmount(),
        date: new Date().toLocaleString(),
        items: cart,
        shippingDetails: formData
      };

      setShowProcessingPopup(false);
      clearCart();
      
      // Redirigir directamente a la página de confirmación
      navigate('/order-confirmation', { 
        state: { orderDetails: newOrderDetails } 
      });

    } catch (error) {
      setShowProcessingPopup(false);
      setError('Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.precio * item.quantity), 0);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
      {showPopup && <Popup message={popupMessage} />}
      
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Finalizar Compra</h2>
        <div className="flex justify-between items-center mb-8">
          {steps.map((step) => (
            <div key={step.number} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${currentStep >= step.number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}
                transition-colors duration-200
              `}>
                {step.number}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-600">{step.title}</span>
              {step.number < steps.length && (
                <div className="w-24 h-1 mx-4 bg-gray-200">
                  <div className={`h-full ${currentStep > step.number ? 'bg-blue-600' : ''} transition-all duration-200`}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                <input
                  type="text"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Código Postal</label>
                <input
                  type="text"
                  name="codigoPostal"
                  value={formData.codigoPostal}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen del Pedido</h3>
              <p className="text-2xl font-bold text-blue-600">Total: ${getTotalAmount().toFixed(2)}</p>
            </div>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Datos de la Tarjeta
              </label>
              <div className="border rounded-lg p-4 bg-white">
                <CardElement options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                  },
                }}/>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-red-600 text-sm mt-2">
            {error}
          </div>
        )}

        {/* Mensaje de procesamiento y éxito */}
        {processingMessage && !error && (
          <div className={`text-center p-4 my-4 rounded-lg ${
            processingMessage.includes('éxito') 
              ? 'bg-green-100 text-green-700' 
              : 'bg-blue-100 text-blue-700'
          }`}>
            {processingMessage}
          </div>
        )}

        {/* Agregar el popup de procesamiento */}
        {showProcessingPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-lg font-semibold text-gray-800">Estamos procesando su pago</p>
              <p className="text-sm text-gray-600 mt-2">Por favor, espere un momento...</p>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
            >
              Anterior
            </button>
          )}
          
          {currentStep < 3 ? (
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Siguiente
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Procesando...' : 'Confirmar Pago'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Checkout;
