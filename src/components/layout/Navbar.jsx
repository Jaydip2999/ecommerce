import { useEffect, useState } from "react";
import "./Navbar.css";

import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={scroll ? "navbar active" : "navbar"}>
      <div className="logo">

        <div className="logo-icon">
          S
        </div>

        <div>
          <h2>ShopEase</h2>
          <span>Premium Store</span>
        </div>

      </div>

      <nav className={menuOpen ? "nav-menu open" : "nav-menu"}>

        <a href="#">Home</a>
        <a href="#">Shop</a>
        <a href="#">Categories</a>
        <a href="#">Deals</a>
        <a href="#">About</a>

      </nav>

      <div className="right-icons">

        <button>
          <FiSearch />
        </button>

        <button>
          <FiHeart />
        </button>

        <button className="cart-btn">

          <FiShoppingCart />

          <span>2</span>

        </button>

        <button>
          <FiUser />
        </button>

        <button className="login-btn">
          Login
        </button>

      </div>

      <div
        className="mobile-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </div>
    </header>
  );
}

export default Navbar;