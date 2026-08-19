import "./Hero.css";
import heroImage from "../../assets/Hero.png";
import { Link } from "react-router-dom";

import { Sparkles, ArrowRight, ShoppingBag } from "lucide-react";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-left">
          <div className="hero-badge">
            <Sparkles size={18} />

            <span>New Collection 2026</span>
          </div>

          <h1>
            Discover Your
            <span> Perfect Style</span>
          </h1>

          <p>
            Discover premium fashion, electronics and lifestyle products with
            exclusive discounts and fast delivery.
          </p>

          <div className="hero-buttons">
            <Link className="shop-btn" to="/products">
              <ShoppingBag size={20} />
              Shop Now
            </Link>

            <Link className="explore-btn" to="/products?sort=deal">
              Explore
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="hero-info">
            <div>
              <h2>20K+</h2>

              <p>Products</p>
            </div>

            <div>
              <h2>15K+</h2>

              <p>Customers</p>
            </div>

            <div>
              <h2>4.9</h2>

              <p>Rating</p>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="discount">40%</div>

          <img src={heroImage} alt="Hero" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
