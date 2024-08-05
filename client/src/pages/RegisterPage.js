// src/pages/RegisterPage.js
import React, { useState } from "react";
import axios from "axios";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        { name, email, password, role }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Registration failed");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">Select Role</option>
          <option value="player">Player</option>
          <option value="coach">Coach</option>
          <option value="admin">Admin</option>
          <option value="club">Club</option>
          <option value="region">Region</option>
          <option value="referee">Referee</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
