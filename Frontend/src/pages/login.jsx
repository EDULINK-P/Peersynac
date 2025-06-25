import React, { useState } from "react";
import "../assets/form.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = { email, password };
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <div className="form-container">
      <div className="form-header">
        <h2 className="form-title">Login to EduLink</h2>
        <p className="form-subtitle">
          Welcome back! Please sign in to your account
        </p>
      </div>
      <form>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter your Email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Enter your Password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />{" "}
        </div>
        <button type="submit" className="form-button" onClick={handleLogin}>
          Login
        </button>
        <p className="form-link">
          Don't have an account?{" "}
          <a className="form-link-a" href="/signup">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
