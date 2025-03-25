"use client";

import "../component.css";
export default function login() {
  return (
    <div className="loginContainer">
      <h2>LOGIN</h2>
      <form >
        <label>Email Account</label>
        <input
          type="email"
          placeholder="Enter your email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          required
        />
        <a href="./signup" className="link">Don't have an account?</a>

        <button type="submit">LOGIN</button>

      </form>

      <p></p>
    </div>
  );
}
