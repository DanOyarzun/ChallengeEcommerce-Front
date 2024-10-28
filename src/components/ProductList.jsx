import React from 'react';
import Popup from "./Popup";

const ProductList = ({ products, loading, error, handleAddToCart, showPopup, popupMessage }) => {
  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {showPopup && <Popup message={popupMessage} />}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            className="bg-white border rounded-lg shadow-md animate-fade-in-up"
            key={product.id}
          >
            <img
              className="w-full h-48 object-cover rounded-t-lg"
              src={product.foto_de_producto}
              alt={product.nombre}
            />
            <div className="p-4">
              <hr />
              <p className="text-sm text-gray-600 mb-1">
                <small>{product.categoria}</small>
              </p>
              <h5 className="text-lg font-semibold">{product.nombre}</h5>
              <p className="text-xl font-bold mb-2">${product.precio}</p>
              <hr />
            </div>
            <div className="flex justify-center mb-2">
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-200"
                onClick={() => handleAddToCart(product)}
              >
                Agregar al carro
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
