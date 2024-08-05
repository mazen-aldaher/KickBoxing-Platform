// src/pages/PlayerDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function PlayerDashboard() {
  const [profile, setProfile] = useState({});
  const [championships, setChampionships] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/users/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfile(response.data);
    };

    const fetchChampionships = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/championships",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setChampionships(response.data);
    };

    fetchProfile();
    fetchChampionships();
  }, []);

  return (
    <div>
      <h1>Player Dashboard</h1>
      <div>
        <h2>Profile</h2>
        <p>Name: {profile.name}</p>
        <p>Email: {profile.email}</p>
        <p>Role: {profile.role}</p>
      </div>
      <div>
        <h2>My Championships</h2>
        <ul>
          {championships.map((championship) => (
            <li key={championship._id}>
              {championship.name} - {championship.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PlayerDashboard;
