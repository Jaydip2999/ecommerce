import { useState } from "react";
import "./Footer.css";

import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiGithub,
  FiArrowUp,
} from "react-icons/fi";

function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const top = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h2>ShopEase</h2>
          <p>Modern ecommerce storefront built with React.</p>

          <div className="social">
            <FiFacebook />
            <FiInstagram />
            <FiTwitter />
            <FiGithub />
          </div>
        </div>

        <div className="footer-col">
          <h3>Company</h3>
          <a href="/products">Shop</a>
          <a href="/products?sort=deal">Deals</a>
          <a href="/wishlist">Wishlist</a>
          <a href="/cart">Cart</a>
        </div>

        <div className="footer-col">
          <h3>Support</h3>
          <a href="/products">Help Center</a>
          <a href="/cart">Shipping</a>
          <a href="/cart">Returns</a>
          <a href="/login">Account</a>
        </div>

        <div className="footer-col">
          <h3>Newsletter</h3>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSubscribed(true);
              event.currentTarget.reset();
            }}
          >
            <input required type="email" placeholder="Enter Email" />
            <button>Subscribe</button>
          </form>
          {subscribed && <small>Thanks for subscribing.</small>}
        </div>
      </div>

      <div className="copyright">
        <p>© 2026 ShopEase. All Rights Reserved.</p>

        <button onClick={top} className="top-btn">
          <FiArrowUp />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
