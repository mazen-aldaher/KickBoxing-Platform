// src/components/Notifications.js
import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:5000";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("newUser", (data) => {
      setNotifications((prev) => [...prev, data.message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
