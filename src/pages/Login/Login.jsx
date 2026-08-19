import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useShop } from "../../context/useShop";

function Login() {
  const { login } = useShop();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = login({
      email: form.get("email"),
      password: form.get("password"),
    });

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate(result.user.role === "admin" ? "/admin" : "/account");
  };

  return (
    <section className="auth-shell">
      <form className="auth-card" onSubmit={submit}>
        <span>Welcome back</span>
        <h1>Login to ShopEase</h1>
        <p>Login with registered customer credentials or admin credentials.</p>
        {error && <div className="form-alert">{error}</div>}
        <input required type="email" name="email" placeholder="Email address" />
        <input required type="password" name="password" placeholder="Password" minLength="6" />
        <button className="primary-button" type="submit">Login</button>
        <div className="credential-box">
          <strong>Demo access</strong>
          <span>Admin: admin@shopease.com / Admin@123</span>
          <span>Customer: customer@shopease.com / Customer@123</span>
        </div>
        <p>New customer? <Link to="/register">Create an account</Link></p>
      </form>
    </section>
  );
}

export default Login;
