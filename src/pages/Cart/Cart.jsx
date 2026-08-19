import { CreditCard, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useShop } from "../../context/useShop";

function Cart() {
  const { cart, removeFromCart, updateQuantity, subtotal, shipping, tax, total, createOrder, user } = useShop();

  const placeOrder = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const order = createOrder({
      name: form.get("name"),
      email: form.get("email"),
      address: form.get("address"),
    });
    alert(`Order ${order.id} placed successfully.`);
  };

  if (cart.length === 0) {
    return (
      <section className="page-shell">
        <div className="empty-state">
          <ShoppingBag size={48} />
          <h1>Your cart is empty</h1>
          <p>Add products to create a ready-to-checkout order.</p>
          <Link to="/products" className="primary-link">Start Shopping</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell">
      <div className="page-heading compact">
        <span>Cart</span>
        <h1>Review Your Order</h1>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>
                <Link to={`/products/${item.id}`}><h3>{item.name}</h3></Link>
                <p>{item.category}</p>
                <strong>${item.price}</strong>
              </div>
              <div className="quantity-row mini">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={15} /></button>
                <input value={item.quantity} onChange={(event) => updateQuantity(item.id, event.target.value)} />
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={15} /></button>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                <Trash2 size={18} />
              </button>
            </article>
          ))}
        </div>

        <aside className="summary-panel">
          <h2>Order Summary</h2>
          <div><span>Subtotal</span><strong>${subtotal}</strong></div>
          <div><span>Shipping</span><strong>{shipping === 0 ? "Free" : `$${shipping}`}</strong></div>
          <div><span>Estimated tax</span><strong>${tax}</strong></div>
          <div className="total-line"><span>Total</span><strong>${total}</strong></div>

          <form className="checkout-form" onSubmit={placeOrder}>
            <input required name="name" defaultValue={user?.name || ""} placeholder="Full name" />
            <input required name="email" type="email" defaultValue={user?.email || ""} placeholder="Email address" />
            <input required name="address" placeholder="Shipping address" />
            <button className="primary-button" type="submit">
              <CreditCard size={18} />
              Place Demo Order
            </button>
          </form>
        </aside>
      </div>
    </section>
  );
}

export default Cart;
