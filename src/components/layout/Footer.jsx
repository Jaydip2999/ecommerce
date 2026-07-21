import "./Footer.css";

import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiGithub,
  FiArrowUp,
} from "react-icons/fi";

function Footer() {
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

          <p>Modern Ecommerce Store built using React.</p>

          <div className="social">
            <FiFacebook />
            <FiInstagram />
            <FiTwitter />
            <FiGithub />
          </div>
        </div>
        <div className="footer-col">
          <h3>Company</h3>
          <a href="#">About</a>
          <a href="#">Careers</a>
          <a href="#">Blog</a>
          <a href="#">Contact</a>
        </div>
        <div className="footer-col">
          <h3>Support</h3>
          <a href="#">Help Center</a>
          <a href="#">Shipping</a>
          <a href="#">Returns</a>
          <a href="#">Privacy</a>
        </div>
        <div className="footer-col">
          <h3>Newsletter</h3>
          <input type="email" placeholder="Enter Email" />

          <button>Subscribe</button>
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
