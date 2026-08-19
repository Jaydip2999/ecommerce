import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useShop } from "../../context/useShop";

import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiGrid,
  FiLogOut,
} from "react-icons/fi";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const { cartCount, wishlist, user, logout } = useShop();

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={scroll ? "navbar active" : "navbar"}>
      <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
        <div className="logo-icon">S</div>

        <div>
          <h2>ShopEase</h2>
          <span>Premium Store</span>
        </div>
      </Link>

      <nav className={menuOpen ? "nav-menu open" : "nav-menu"}>
        <NavLink onClick={() => setMenuOpen(false)} to="/">Home</NavLink>
        <NavLink onClick={() => setMenuOpen(false)} to="/products">Shop</NavLink>
        <NavLink onClick={() => setMenuOpen(false)} to="/products?category=Electronics">Electronics</NavLink>
        <NavLink onClick={() => setMenuOpen(false)} to="/products?category=Fashion">Fashion</NavLink>
        <NavLink onClick={() => setMenuOpen(false)} to="/products?sort=deal">Deals</NavLink>
        {user?.role === "admin" && (
          <NavLink onClick={() => setMenuOpen(false)} to="/admin">Admin</NavLink>
        )}
        <NavLink onClick={() => setMenuOpen(false)} className="mobile-only-link" to="/wishlist">Wishlist</NavLink>
        <NavLink onClick={() => setMenuOpen(false)} className="mobile-only-link" to="/cart">Cart</NavLink>
        <NavLink onClick={() => setMenuOpen(false)} className="mobile-only-link" to={user ? "/account" : "/login"}>
          {user ? "Account" : "Login"}
        </NavLink>
      </nav>

      <div className="right-icons">
        <Link aria-label="Search products" to="/products" className="icon-link">
          <FiSearch />
        </Link>

        <Link aria-label="Wishlist" to="/wishlist" className="icon-link badge-link">
          <FiHeart />
          {wishlist.length > 0 && <span>{wishlist.length}</span>}
        </Link>

        <Link aria-label="Cart" to="/cart" className="icon-link cart-btn">
          <FiShoppingCart />

          {cartCount > 0 && <span>{cartCount}</span>}
        </Link>

        {user?.role === "admin" && (
          <Link aria-label="Admin dashboard" to="/admin" className="icon-link">
            <FiGrid />
          </Link>
        )}

        <div className="account-menu">
          <Link aria-label="Account" to={user ? "/account" : "/login"} className="account-trigger">
            <FiUser />
            <span>{user ? user.name : "Account"}</span>
          </Link>
          {user && (
            <div className="account-dropdown">
              <Link to="/account">My Account</Link>
              {user.role === "admin" && <Link to="/admin">Admin Panel</Link>}
              <button onClick={logout}><FiLogOut /> Logout</button>
            </div>
          )}
        </div>
      </div>

      <button className="mobile-btn" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>
    </header>
  );
}

export default Navbar;
