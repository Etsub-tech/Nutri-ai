import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/page.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setSuccess(true);
        setTimeout(() => navigate("/login"), 1400);
      }
      
      else {
        const text = await res.text();
        setError(text || "Registration failed");
      }
    } catch (err) {
      setError("Failed to register. Please try again.");
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
        <h1 className="auth-title">Register</h1>
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

          <label>Confirm Password</label>
          <input
            className="auth-input"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p style={{ color: "red", marginTop: "-20px", marginBottom: "10px" }}>{error}</p>}
          {success && <p style={{ color: "green", marginTop: "-20px", marginBottom: "10px" }}>Registered successfully! Redirecting to home...</p>}

          <button type="submit" className="auth-button">
            Register
          </button>
        </form>

        <div className="auth-link">
          <p>
            Already registered? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
