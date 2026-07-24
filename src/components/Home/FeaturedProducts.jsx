import "./FeaturedProducts.css";

const products = [
  {
    id: 1,
    name: "Classic Watch",
    price: "$199",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
  },
  {
    id: 2,
    name: "Running Shoes",
    price: "$149",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
  },
  {
    id: 3,
    name: "Headphones",
    price: "$129",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  },
  {
    id: 4,
    name: "Backpack",
    price: "$89",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="featured">
      <div className="container">
        <h2>Featured Products</h2>
        <p>Discover our most popular products.</p>

        <div className="product-grid">
          {products.map((item) => (
            <div className="product-card" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="product-info">
                <h3>{item.name}</h3>
                <span>{item.price}</span>

                <button>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;