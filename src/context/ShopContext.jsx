import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products } from "../data/products";

const ShopContext = createContext(null);

const loadState = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => loadState("shopease-cart", []));
  const [wishlist, setWishlist] = useState(() =>
    loadState("shopease-wishlist", []),
  );
  const [user, setUser] = useState(() => loadState("shopease-user", null));

  useEffect(() => {
    localStorage.setItem("shopease-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("shopease-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("shopease-user", JSON.stringify(user));
  }, [user]);

  const addToCart = (product, quantity = 1) => {
    setCart((items) => {
      const current = items.find((item) => item.id === product.id);
      if (current) {
        return items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, 10) }
            : item,
        );
      }
      return [...items, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart((items) => items.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Math.min(Number(quantity), 10)) }
          : item,
      ),
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product) => {
    setWishlist((items) => {
      const exists = items.some((item) => item.id === product.id);
      return exists
        ? items.filter((item) => item.id !== product.id)
        : [...items, product];
    });
  };

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 0 && subtotal < 250 ? 14 : 0;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  const value = useMemo(
    () => ({
      products,
      cart,
      wishlist,
      user,
      cartCount,
      subtotal,
      shipping,
      tax,
      total,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      isWishlisted,
      login: setUser,
      logout: () => setUser(null),
    }),
    [cart, wishlist, user, cartCount, subtotal, shipping, tax, total],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export const useShop = () => useContext(ShopContext);
