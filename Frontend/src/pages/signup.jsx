import React, { useState } from "react";
import "../assets/form.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    const payload = { name, email, password };
    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      throw new Error("Error during signup:", error);
    }
  };
  return (
    <div className="form-container">
      <div className="form-header">
        <h2 className="form-title">Join Edulink</h2>
        <p className="form-subtitle">Create an Account to get started</p>
      </div>
      <form>
        <div className="form-group">
          <input
            type="text"
            placeholder="Full Name"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
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
            placeholder="Create your Password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button" onClick={handleSignUp}>
          Create Account
        </button>
        <p className="form-link">
          Already have an account?
          <a className="form-link-a" href="/login">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
