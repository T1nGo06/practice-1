import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const addToCart = (product) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: prev[product.id]
        ? { ...prev[product.id], quantity: prev[product.id].quantity + 1 }
        : { ...product, quantity: 1 },
    }));
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[id].quantity > 1) {
        updatedCart[id].quantity -= 1;
      } else {
        delete updatedCart[id];
      }
      return updatedCart;
    });
  };

  const clearCart = () => setCart({});

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
    