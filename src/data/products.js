export const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Furniture",
  "Beauty",
  "Watches",
  "Shoes",
];

export const products = [
  {
    id: 1,
    name: "Classic Silver Watch",
    category: "Watches",
    price: 199,
    oldPrice: 249,
    rating: 4.8,
    stock: 14,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&auto=format&fit=crop",
    description:
      "A polished stainless steel watch with a scratch-resistant face and everyday water resistance.",
  },
  {
    id: 2,
    name: "Velocity Running Shoes",
    category: "Shoes",
    price: 149,
    oldPrice: 189,
    rating: 4.7,
    stock: 22,
    badge: "New",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop",
    description:
      "Lightweight trainers with responsive cushioning, breathable mesh, and a durable road outsole.",
  },
  {
    id: 3,
    name: "Studio Wireless Headphones",
    category: "Electronics",
    price: 129,
    oldPrice: 169,
    rating: 4.6,
    stock: 18,
    badge: "Hot Deal",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&auto=format&fit=crop",
    description:
      "Comfortable wireless headphones with rich bass, active noise reduction, and 35-hour battery life.",
  },
  {
    id: 4,
    name: "Urban Travel Backpack",
    category: "Fashion",
    price: 89,
    oldPrice: 120,
    rating: 4.5,
    stock: 31,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&auto=format&fit=crop",
    description:
      "A compact commuter backpack with laptop storage, organized pockets, and weather-resistant fabric.",
  },
  {
    id: 5,
    name: "Minimal Lounge Chair",
    category: "Furniture",
    price: 329,
    oldPrice: 399,
    rating: 4.9,
    stock: 9,
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=900&auto=format&fit=crop",
    description:
      "A sculpted lounge chair with supportive padding, soft woven upholstery, and a compact footprint.",
  },
  {
    id: 6,
    name: "Glow Skin Care Kit",
    category: "Beauty",
    price: 74,
    oldPrice: 99,
    rating: 4.4,
    stock: 26,
    badge: "Bundle",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&auto=format&fit=crop",
    description:
      "A daily skincare set with cleanser, serum, moisturizer, and SPF for a clean, hydrated routine.",
  },
  {
    id: 7,
    name: "Smart Home Speaker",
    category: "Electronics",
    price: 99,
    oldPrice: 129,
    rating: 4.3,
    stock: 17,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=900&auto=format&fit=crop",
    description:
      "A compact smart speaker with clear voice pickup, room-filling sound, and multi-room pairing.",
  },
  {
    id: 8,
    name: "Tailored Cotton Jacket",
    category: "Fashion",
    price: 119,
    oldPrice: 158,
    rating: 4.6,
    stock: 15,
    badge: "Limited",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900&auto=format&fit=crop",
    description:
      "A clean cotton jacket with a relaxed silhouette, deep pockets, and season-spanning comfort.",
  },
];

export const getProductById = (id) =>
  products.find((product) => product.id === Number(id));
