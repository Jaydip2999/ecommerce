import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-box">
          <h2>ShopEase</h2>
          <p>
            Your one-stop destination for quality products at the best prices.
          </p>
        </div>

        <div className="footer-box">
          <h3>Quick Links</h3>

          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Categories</li>
            <li>Cart</li>
          </ul>

        </div>

        <div className="footer-box">

          <h3>Customer Support</h3>

          <p>Email: support@shopease.com</p>

          <p>Phone: +91 9876543210</p>

        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 ShopEase. All Rights Reserved.
      </p>

    </footer>
  );
}

export default Footer;