// src/pages/HomePage.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function HomePage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await axios.get("http://localhost:5000/api/news");
      setNews(response.data);
    };
    fetchNews();
  }, []);

  return (
    <div>
      <h1>Welcome to the Egyptian Kickboxing Federation</h1>
      <div>
        {news.map((item) => (
          <div key={item._id}>
            <h2>{item.title}</h2>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
