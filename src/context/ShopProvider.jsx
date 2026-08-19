import { useCallback, useEffect, useMemo, useState } from "react";
import { products as initialProducts } from "../data/products";
import { sampleOrders } from "../data/orders";
import { ShopContext } from "./ShopContext";

const loadState = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

export function ShopProvider({ children }) {
  const [products, setProducts] = useState(() =>
    loadState("shopease-products", initialProducts),
  );
  const [cart, setCart] = useState(() => loadState("shopease-cart", []));
  const [wishlist, setWishlist] = useState(() =>
    loadState("shopease-wishlist", []),
  );
  const [user, setUser] = useState(() => loadState("shopease-user", null));
  const [orders, setOrders] = useState(() =>
    loadState("shopease-orders", sampleOrders),
  );

  useEffect(() => {
    localStorage.setItem("shopease-products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("shopease-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("shopease-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("shopease-user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("shopease-orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = useCallback((product, quantity = 1) => {
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
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((items) => items.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    setCart((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Math.min(Number(quantity), 10)) }
          : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const createOrder = useCallback(
    (customer) => {
      const orderSubtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      const orderShipping = orderSubtotal > 0 && orderSubtotal < 250 ? 14 : 0;
      const orderTax = Math.round(orderSubtotal * 0.08);
      const createdOrder = {
        id: `SE-${Date.now().toString().slice(-5)}`,
        customer: customer.name,
        email: customer.email,
        address: customer.address,
        total: orderSubtotal + orderShipping + orderTax,
        status: "Processing",
        date: new Date().toISOString().slice(0, 10),
        items: cart.reduce((sum, item) => sum + item.quantity, 0),
        products: cart,
      };

      setOrders((items) => [createdOrder, ...items]);
      setProducts((items) =>
        items.map((product) => {
          const purchased = cart.find((item) => item.id === product.id);
          return purchased
            ? { ...product, stock: Math.max(0, product.stock - purchased.quantity) }
            : product;
        }),
      );
      setCart([]);

      return createdOrder;
    },
    [cart],
  );

  const addProduct = useCallback((product) => {
    setProducts((items) => [
      {
        ...product,
        id: Date.now(),
        price: Number(product.price),
        oldPrice: Number(product.oldPrice || product.price),
        rating: Number(product.rating || 4.5),
        stock: Number(product.stock || 1),
      },
      ...items,
    ]);
  }, []);

  const updateProductStock = useCallback((id, stock) => {
    setProducts((items) =>
      items.map((item) =>
        item.id === id ? { ...item, stock: Math.max(0, Number(stock)) } : item,
      ),
    );
  }, []);

  const toggleWishlist = useCallback((product) => {
    setWishlist((items) => {
      const exists = items.some((item) => item.id === product.id);
      return exists
        ? items.filter((item) => item.id !== product.id)
        : [...items, product];
    });
  }, []);

  const isWishlisted = useCallback(
    (id) => wishlist.some((item) => item.id === id),
    [wishlist],
  );

  const login = useCallback((account) => setUser(account), []);
  const logout = useCallback(() => setUser(null), []);

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
      products,
      wishlist,
      user,
      orders,
      cartCount,
      subtotal,
      shipping,
      tax,
      total,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      createOrder,
      toggleWishlist,
      isWishlisted,
      addProduct,
      updateProductStock,
      login,
      logout,
    }),
    [
      cart,
      wishlist,
      user,
      orders,
      cartCount,
      subtotal,
      shipping,
      tax,
      total,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      createOrder,
      toggleWishlist,
      isWishlisted,
      addProduct,
      updateProductStock,
      login,
      logout,
    ],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
