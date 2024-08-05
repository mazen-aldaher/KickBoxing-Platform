// src/pages/FinancialSupervisorDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function FinancialSupervisorDashboard() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/subscriptions",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubscriptions(response.data);
    };

    fetchSubscriptions();
  }, []);

  return (
    <div>
      <h1>Financial Supervisor Dashboard</h1>
      <div>
        <h2>Subscriptions</h2>
        <ul>
          {subscriptions.map((subscription) => (
            <li key={subscription._id}>
              {subscription.type}: {subscription.amount} -{" "}
              {subscription.dueDate}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FinancialSupervisorDashboard;
