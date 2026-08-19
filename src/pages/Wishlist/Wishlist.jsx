import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useShop } from "../../context/useShop";

function Wishlist() {
  const { wishlist, addToCart, toggleWishlist } = useShop();

  if (wishlist.length === 0) {
    return (
      <section className="page-shell">
        <div className="empty-state">
          <Heart size={48} />
          <h1>Your wishlist is empty</h1>
          <p>Save products here and move them to cart when your customer is ready.</p>
          <Link to="/products" className="primary-link">Browse Products</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell">
      <div className="page-heading compact">
        <span>Wishlist</span>
        <h1>Saved Products</h1>
      </div>

      <div className="product-grid shop-grid">
        {wishlist.map((item) => (
          <div className="product-card" key={item.id}>
            <Link to={`/products/${item.id}`} className="product-image">
              <span className="product-badge">{item.badge}</span>
              <img src={item.image} alt={item.name} />
            </Link>
            <div className="product-info">
              <Link to={`/products/${item.id}`}><h3>{item.name}</h3></Link>
              <p className="product-copy">{item.description}</p>
              <div className="price-row">
                <strong>${item.price}</strong>
                <del>${item.oldPrice}</del>
              </div>
              <div className="product-actions">
                <button onClick={() => addToCart(item)}>
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                <button className="wish active" onClick={() => toggleWishlist(item)} aria-label="Remove wishlist">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Wishlist;
