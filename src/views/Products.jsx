import React, { useEffect, useState } from "react";
import "../assets/css/Products.css";
import useCartStore from "../context/CartContext";
import { getCategoryProducts, getProducts, searchProducts as searchProductsApi } from "../services/api";
import Popup from "../components/Popup";
import { useLocation } from "react-router-dom";
import ProductSearch from "../components/ProductSearch";
import ProductList from "../components/ProductList";

const Products = () => {
  const { addToCart, cart } = useCartStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const location = useLocation();

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const triggerPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const [categoryKey, setCategoryKey] = useState(0);

  const handleCategoryChange = (newCategory) => {
    if (newCategory !== selectedCategory) {
      setSelectedCategory(newCategory);
      setCategoryKey(prev => prev + 1);
      setPage(1);
      setProducts([]); // Limpiar productos al cambiar categoría
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let isSubscribed = true;
    const loadProducts = async () => {
      if (!isSubscribed) return;
      
      setLoading(true);
      try {
        const params = new URLSearchParams(location.search);
        const query = params.get('buscar');
        
        let response;
        if (query) {
          response = await searchProductsApi(query);
        } else if (selectedCategory) {
          response = await getCategoryProducts(selectedCategory, page);
        } else {
          response = await getProducts(page);
        }

        if (isSubscribed && response?.productos) {
          // Eliminar la verificación de cambios y simplemente actualizar los productos
          setProducts(response.productos);
          setTotalPages(response.totalPages || 1);
        }
      } catch (err) {
        if (isSubscribed) {
          setError(err.message);
          setProducts([]);
        }
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    };

    loadProducts();
    
    return () => {
      isSubscribed = false;
    };
  }, [location.search, selectedCategory, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      const currentParams = new URLSearchParams(location.search);
      const currentQuery = currentParams.get('buscar');
      
      if (trimmedQuery !== currentQuery) {
        const searchParams = new URLSearchParams();
        searchParams.set('buscar', trimmedQuery);
        window.history.pushState({}, '', `?${searchParams.toString()}`);
        setPage(1);
        setProducts([]); // Limpiar productos al buscar
      }
    }
  };

  const manejoPaginas = (nuevaPag) => {
    if (nuevaPag >= 1 && nuevaPag <= totalPages) {
      setPage(nuevaPag);
    }
  };

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      addToCart({ ...existingProduct, quantity: existingProduct.quantity + 1 });
    } else {
      addToCart({ ...product, quantity: 1 });
    }
    triggerPopup(`Producto "${product.nombre}" añadido al carrito. Total en el carrito: $${getTotalPrice()}`);
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.precio * item.quantity, 0)
      .toFixed(2);
  };

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row">
      <ProductSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        handleCategoryChange={handleCategoryChange}
      />
      <div className="md:w-3/4 p-4">
        <ProductList
          products={products}
          loading={loading}
          error={error}
          handleAddToCart={handleAddToCart}
          showPopup={showPopup}
          popupMessage={popupMessage}
        />
        <div className="flex justify-between items-center mt-4">
          <button
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
            onClick={() => manejoPaginas(page - 1)}
            disabled={page === 1}
          >
            Anterior
          </button>
          <span>
            Página {page} de {totalPages}
          </span>
          <button
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
            onClick={() => manejoPaginas(page + 1)}
            disabled={page === totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
