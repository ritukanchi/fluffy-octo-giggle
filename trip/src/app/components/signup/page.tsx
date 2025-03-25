"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebaseConfig"; // Import Firebase auth
import "../component.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300..800&display=swap" rel="stylesheet" />

      <div className="signup-container">
        {/* Left Side */}
        <div className="signup-left">
  Welcome to Tripsy!
  <div className="signup-left-body">
    Planning trips made easy with Tripsy. Come join us and discover the best travel destinations, hidden gems, and personalized recommendations just for you!
  </div>
</div>


        {/* Right Side - Signup Form */}
        <div className="signup-right">
          <form className="signup-form" onSubmit={handleSignup}>
            {error && <p className="error-message">{error}</p>}
            <div className="signup-heading">Sign Up</div>
            <label className="signup-label">Email</label>
            <input
              type="email"
              required
              className="signup-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="signup-label">Password</label>
            <input
              type="password"
              required
              className="signup-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="signup-button">SIGN UP</button>

            <p className="login-link">
              Already have an account? <a href="./login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
