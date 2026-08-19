import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../../context/useShop";

function Login() {
  const { login } = useShop();
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    login({ name: form.get("email").split("@")[0], email: form.get("email") });
    navigate("/products");
  };

  return (
    <section className="auth-shell">
      <form className="auth-card" onSubmit={submit}>
        <span>Welcome back</span>
        <h1>Login to ShopEase</h1>
        <input required type="email" name="email" placeholder="Email address" />
        <input required type="password" name="password" placeholder="Password" minLength="6" />
        <button className="primary-button" type="submit">Login</button>
        <p>New customer? <Link to="/register">Create an account</Link></p>
      </form>
    </section>
  );
}

export default Login;
