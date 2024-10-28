import {create} from 'zustand';

const useCartStore = create((set) => ({
  cart: JSON.parse(localStorage.getItem('cart')) || [],

  addToCart: (product) => set((state) => {
    const existingProduct = state.cart.find(item => item.id === product.id);

    let updatedCart;

    if (existingProduct) {
      // Si el producto ya está en el carrito, incrementa la cantidad
      updatedCart = state.cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + product.quantity }
          : item
      );
    } else {
      // Si no está en el carrito, agrégalo
      updatedCart = [...state.cart, product];
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));  // Guardar carrito en localStorage
    return { cart: updatedCart };
  }),

  removeFromCart: (productId) => set((state) => {
    const updatedCart = state.cart.filter((item) => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));  // Actualizar localStorage
    return { cart: updatedCart };
  }),

  clearCart: () => {
    localStorage.removeItem('cart');
    set({ cart: [] });
  },

  loadCartFromStorage: () => set(() => ({
    cart: JSON.parse(localStorage.getItem('cart')) || []
  })),
}));

export default useCartStore;
