// src/pages/AdminSupervisorDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminSupervisorDashboard() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchPendingRequests = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/admin/requests",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPendingRequests(response.data);
    };

    const fetchStats = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/admin/stats",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStats(response.data);
    };

    fetchPendingRequests();
    fetchStats();
  }, []);

  return (
    <div>
      <h1>Admin Supervisor Dashboard</h1>
      <div>
        <h2>Pending Requests</h2>
        <ul>
          {pendingRequests.map((request) => (
            <li key={request._id}>
              {request.type}: {request.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Statistics</h2>
        <p>Players: {stats.players}</p>
        <p>Coaches: {stats.coaches}</p>
        <p>Clubs: {stats.clubs}</p>
        <p>Regions: {stats.regions}</p>
        <p>Committees: {stats.committees}</p>
        <p>Championships: {stats.championships}</p>
      </div>
    </div>
  );
}

export default AdminSupervisorDashboard;
