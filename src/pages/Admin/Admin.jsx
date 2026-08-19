import {
  BarChart3,
  Boxes,
  DollarSign,
  PackageCheck,
  ShoppingBag,
  Users,
} from "lucide-react";
import { categories } from "../../data/products";
import { useShop } from "../../context/useShop";

function Admin() {
  const { products, orders, addProduct, updateProductStock } = useShop();
  const revenue = orders.reduce((total, order) => total + order.total, 0);
  const lowStock = products.filter((product) => product.stock <= 10).length;
  const customers = new Set(orders.map((order) => order.email)).size;
  const conversion = orders.length ? Math.min(12.8, 4.2 + orders.length * 1.4).toFixed(1) : "0.0";

  const submitProduct = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    addProduct({
      name: form.get("name"),
      category: form.get("category"),
      price: form.get("price"),
      oldPrice: form.get("oldPrice"),
      stock: form.get("stock"),
      rating: 4.6,
      badge: "New",
      image: form.get("image") || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&auto=format&fit=crop",
      description: form.get("description"),
    });
    event.currentTarget.reset();
    alert("Product added to storefront.");
  };

  return (
    <section className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="logo-icon">S</div>
          <div>
            <h2>ShopEase</h2>
            <span>Admin Panel</span>
          </div>
        </div>
        <a href="#overview">Overview</a>
        <a href="#orders">Orders</a>
        <a href="#products">Products</a>
        <a href="#inventory">Inventory</a>
      </aside>

      <div className="admin-main">
        <div className="admin-topbar">
          <div>
            <span className="eyebrow">Dashboard</span>
            <h1>Store Performance</h1>
          </div>
          <p>Frontend admin demo with persistent local data.</p>
        </div>

        <div className="stats-grid" id="overview">
          <article><DollarSign /><span>Revenue</span><strong>${revenue}</strong></article>
          <article><ShoppingBag /><span>Orders</span><strong>{orders.length}</strong></article>
          <article><Users /><span>Customers</span><strong>{customers}</strong></article>
          <article><Boxes /><span>Low Stock</span><strong>{lowStock}</strong></article>
        </div>

        <div className="admin-grid">
          <section className="admin-card" id="products">
            <div className="table-heading">
              <div>
                <h2>Sales Overview</h2>
                <p>Revenue health, conversion, and fulfillment status.</p>
              </div>
              <BarChart3 size={24} />
            </div>
            <div className="sales-bars">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                <div key={day}>
                  <span style={{ height: `${42 + index * 8}%` }} />
                  <small>{day}</small>
                </div>
              ))}
            </div>
            <div className="metric-row">
              <span>Conversion rate</span>
              <strong>{conversion}%</strong>
            </div>
            <div className="metric-row">
              <span>Average order value</span>
              <strong>${orders.length ? Math.round(revenue / orders.length) : 0}</strong>
            </div>
          </section>

          <section className="admin-card">
            <div className="table-heading">
              <div>
                <h2>Add Product</h2>
                <p>Add new catalog items without touching code.</p>
              </div>
              <PackageCheck size={24} />
            </div>
            <form className="admin-form" onSubmit={submitProduct}>
              <input required name="name" placeholder="Product name" />
              <select required name="category" defaultValue="">
                <option value="" disabled>Category</option>
                {categories.filter((category) => category !== "All").map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="form-pair">
                <input required name="price" type="number" min="1" placeholder="Price" />
                <input name="oldPrice" type="number" min="1" placeholder="Old price" />
              </div>
              <input required name="stock" type="number" min="0" placeholder="Stock" />
              <input name="image" placeholder="Image URL" />
              <textarea required name="description" placeholder="Short product description" />
              <button className="primary-button">Add Product</button>
            </form>
          </section>
        </div>

        <section className="admin-card" id="orders">
          <div className="table-heading">
            <div>
              <h2>Recent Orders</h2>
              <p>Track customer orders and fulfillment status.</p>
            </div>
          </div>
          <div className="responsive-table">
            <table>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td>{order.items}</td>
                    <td><span className="status-pill">{order.status}</span></td>
                    <td>${order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="admin-card" id="inventory">
          <div className="table-heading">
            <div>
              <h2>Product Inventory</h2>
              <p>Update stock levels and monitor catalog readiness.</p>
            </div>
          </div>
          <div className="responsive-table">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>${product.price}</td>
                    <td>
                      <input
                        className="stock-input"
                        value={product.stock}
                        type="number"
                        min="0"
                        onChange={(event) => updateProductStock(product.id, event.target.value)}
                      />
                    </td>
                    <td>
                      <span className={product.stock <= 10 ? "status-pill danger" : "status-pill"}>
                        {product.stock <= 10 ? "Low Stock" : "In Stock"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Admin;
