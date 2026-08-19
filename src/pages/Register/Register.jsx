import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useShop } from "../../context/useShop";

function Register() {
  const { register } = useShop();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = register({
      name: form.get("name"),
      email: form.get("email"),
      password,
    });

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate("/account");
  };

  return (
    <section className="auth-shell">
      <form className="auth-card" onSubmit={submit}>
        <span>Create account</span>
        <h1>Start Shopping</h1>
        {error && <div className="form-alert">{error}</div>}
        <input required name="name" placeholder="Full name" />
        <input required type="email" name="email" placeholder="Email address" />
        <input required type="password" name="password" placeholder="Password" minLength="6" />
        <input required type="password" name="confirmPassword" placeholder="Confirm password" minLength="6" />
        <button className="primary-button" type="submit">Register</button>
        <p>Already registered? <Link to="/login">Login</Link></p>
      </form>
    </section>
  );
}

export default Register;
