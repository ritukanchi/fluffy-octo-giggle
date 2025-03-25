"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebaseConfig"; // Import Firebase auth
import "../component.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300..800&display=swap" rel="stylesheet" />

      <div className="login-container">
        <div className="login-heading">Login</div>
        <form className="login-form" onSubmit={handleLogin}>
          {error && <p className="error-message">{error}</p>}

          <label className="login-label">Email</label>
          <input
            type="email"
            required
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="login-label">Password</label>
          <input
            type="password"
            required
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <a href="./signup" className="signup-link">
            Don't have an account?
          </a>

          <button type="submit" className="login-button">LOGIN</button>
        </form>
      </div>
    </>
  );
}
