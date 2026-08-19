import "./FeaturedProducts.css";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

const FeaturedProducts = () => {
  const { products, addToCart, toggleWishlist, isWishlisted } = useShop();

  return (
    <section className="featured">
      <div className="container">
        <div className="section-title">
          <span>Featured Picks</span>
          <h2>Best Products For Your Storefront</h2>
          <p>Discover our most popular products.</p>
        </div>

        <div className="product-grid">
          {products.slice(0, 4).map((item) => (
            <div className="product-card" key={item.id}>
              <Link to={`/products/${item.id}`} className="product-image">
                <span className="product-badge">{item.badge}</span>
                <img src={item.image} alt={item.name} />
              </Link>

              <div className="product-info">
                <div className="product-meta">
                  <span>{item.category}</span>
                  <span><Star size={15} fill="currentColor" /> {item.rating}</span>
                </div>
                <Link to={`/products/${item.id}`}>
                  <h3>{item.name}</h3>
                </Link>
                <div className="price-row">
                  <strong>${item.price}</strong>
                  <del>${item.oldPrice}</del>
                </div>

                <div className="product-actions">
                  <button onClick={() => addToCart(item)}>
                    <ShoppingCart size={18} />
                    Add
                  </button>
                  <button
                    className={isWishlisted(item.id) ? "wish active" : "wish"}
                    onClick={() => toggleWishlist(item)}
                    aria-label="Toggle wishlist"
                  >
                    <Heart size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link to="/products" className="view-all">View All Products</Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
