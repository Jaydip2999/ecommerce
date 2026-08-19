import { ArrowLeft, Heart, ShieldCheck, ShoppingCart, Star, Truck } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useShop } from "../../context/useShop";

function ProductDetails() {
  const { id } = useParams();
  const { products, addToCart, toggleWishlist, isWishlisted } = useShop();
  const product = products.find((item) => item.id === Number(id));
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <section className="page-shell">
        <div className="empty-state">
          <h1>Product not found</h1>
          <Link to="/products" className="primary-link">Back to shop</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell">
      <Link to="/products" className="back-link"><ArrowLeft size={18} /> Back to products</Link>

      <div className="details-layout">
        <div className="details-media">
          <span className="product-badge">{product.badge}</span>
          <img src={product.image} alt={product.name} />
        </div>

        <div className="details-panel">
          <span className="eyebrow">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="rating-line">
            <Star size={18} fill="currentColor" />
            {product.rating} rating · {product.stock} in stock
          </div>
          <p>{product.description}</p>

          <div className="price-row large">
            <strong>${product.price}</strong>
            <del>${product.oldPrice}</del>
          </div>

          <div className="quantity-row">
            <span>Quantity</span>
            <div>
              <button onClick={() => setQuantity((value) => Math.max(1, value - 1))}>-</button>
              <input value={quantity} onChange={(event) => setQuantity(event.target.value)} />
              <button onClick={() => setQuantity((value) => Math.min(10, Number(value) + 1))}>+</button>
            </div>
          </div>

          <div className="details-actions">
            <button className="primary-button" onClick={() => addToCart(product, Number(quantity))}>
              <ShoppingCart size={19} />
              Add to Cart
            </button>
            <button
              className={isWishlisted(product.id) ? "secondary-button active" : "secondary-button"}
              onClick={() => toggleWishlist(product)}
            >
              <Heart size={19} />
              Wishlist
            </button>
          </div>

          <div className="trust-list">
            <span><Truck size={18} /> Free delivery over $250</span>
            <span><ShieldCheck size={18} /> Secure checkout and 30-day returns</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
