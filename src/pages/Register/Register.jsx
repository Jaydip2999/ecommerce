import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

function Register() {
  const { login } = useShop();
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    login({ name: form.get("name"), email: form.get("email") });
    navigate("/products");
  };

  return (
    <section className="auth-shell">
      <form className="auth-card" onSubmit={submit}>
        <span>Create account</span>
        <h1>Start Shopping</h1>
        <input required name="name" placeholder="Full name" />
        <input required type="email" name="email" placeholder="Email address" />
        <input required type="password" name="password" placeholder="Password" minLength="6" />
        <button className="primary-button" type="submit">Register</button>
        <p>Already registered? <Link to="/login">Login</Link></p>
      </form>
    </section>
  );
}

export default Register;
