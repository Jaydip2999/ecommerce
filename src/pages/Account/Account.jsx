import { Link } from "react-router-dom";
import { Heart, LayoutDashboard, LogOut, Package, ShoppingCart, User } from "lucide-react";
import { useShop } from "../../context/useShop";

function Account() {
  const { user, orders, wishlist, cartCount, logout } = useShop();

  if (!user) {
    return (
      <section className="auth-shell">
        <div className="auth-card">
          <span>Account</span>
          <h1>Login Required</h1>
          <p>Login to view orders, wishlist, and customer details.</p>
          <Link className="primary-button" to="/login">Login</Link>
        </div>
      </section>
    );
  }

  const customerOrders = orders.filter((order) => order.email === user.email);

  return (
    <section className="page-shell">
      <div className="account-hero">
        <div>
          <span className="eyebrow">My Account</span>
          <h1>Hello, {user.name}</h1>
          <p>Manage your orders, saved products, shopping activity, and store access.</p>
        </div>
        <div className="account-actions">
          {user.role === "admin" && (
            <Link className="secondary-button" to="/admin"><LayoutDashboard size={18} /> Admin Panel</Link>
          )}
          <button className="secondary-button" onClick={logout}><LogOut size={18} /> Logout</button>
        </div>
      </div>

      <div className="stats-grid">
        <article><Package /><span>Orders</span><strong>{customerOrders.length}</strong></article>
        <article><Heart /><span>Wishlist</span><strong>{wishlist.length}</strong></article>
        <article><ShoppingCart /><span>Cart Items</span><strong>{cartCount}</strong></article>
      </div>

      <div className="admin-card">
        <div className="table-heading">
          <div>
            <h2>Recent Orders</h2>
            <p>Your latest customer checkout activity.</p>
          </div>
          <User size={22} />
        </div>

        {customerOrders.length === 0 ? (
          <div className="empty-inline">
            <p>No orders yet.</p>
            <Link to="/products">Shop products</Link>
          </div>
        ) : (
          <div className="responsive-table">
            <table>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {customerOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.items}</td>
                    <td><span className="status-pill">{order.status}</span></td>
                    <td>${order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Account;
