import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/page.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId || data.email || email);
        localStorage.setItem("user", data.email || email);
        navigate("/home");
      } else {
        const text = await res.text();
        setError(text || "Invalid credentials");
      }
    } catch (err) {
      setError("Failed to login. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="register-body">
      <div className="auth-logo-container">
        <img
          className="auth-logo"
          src="/pics/Screenshot 2025-11-16 004429.png"
          alt="NutriAI Logo"
        />
        <div className="auth-logo-text">NutriAI</div>
      </div>
      <div className="auth-container fade-in">
        <h1 className="auth-title">Login</h1>
        <form onSubmit={submit}>
          <label>Email</label>
          <input
            className="auth-input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            className="auth-input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p style={{ color: "red", marginTop: "-20px", marginBottom: "10px" }}>{error}</p>}

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        <div className="auth-link">
          <p>
            No account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
