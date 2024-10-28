const API_URL = 'http://localhost:3000';

// Agregar productos al carrito
export const addToCart = async (product) => {
  const response = await fetch(`${API_URL}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  return response.json();
};

// Crear pedido
export const createOrder = async (cart, userDetails) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cart, userDetails }),
  });
  return response.json();
};

export const getProducts = async (page, limit=20) => {
  const response = await fetch(`${API_URL}/productos?page=${page}&limit=${limit}`, reqOps());
  if (!response.ok) throw new Error("Error al obtener los productos");
  return response.json();
}

export const getCategoryProducts = async (category, page, limit=20) => {
  
  const response = await fetch(`${API_URL}/productos/categoria/${category}?page=${page}&limit=${limit}`, reqOps());
  if (!response.ok) throw new Error("Error al obtener los productos");
  return response.json();
}

export const getCategories = async () => {
  const response = await fetch(`${API_URL}/categorias`, reqOps());
  if (!response.ok) throw new Error("Error al obtener las categorías");
  return response.json();
}

const reqOps = (method = "GET", body, token = localStorage.getItem("token")) => ({
  method: method,
  headers: {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(body ? { "Content-Type": "application/json" } : {}),
  },
  body: typeof body === 'string' ? body : JSON.stringify(body),
})

// Añadir esta nueva función al archivo existente
export const createPaymentIntent = async (amount) => {
  const response = await fetch(`${API_URL}/create-payment-intent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ amount }),
  });
  
  if (!response.ok) {
    throw new Error('Error al crear la intención de pago');
  }
  
  return response.json();
};

export const searchProducts = async (query) => {
  const response = await fetch(`${API_URL}/productos/buscar?q=${query}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) throw new Error('Error al buscar productos');
  return response.json();
};

export const searchSuggestions = async (query) => {
  const response = await fetch(`${API_URL}/productos/sugerencias?q=${query}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) throw new Error('Error al obtener sugerencias');
  return response.json();
};
