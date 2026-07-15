import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>ShopEase</h2>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;