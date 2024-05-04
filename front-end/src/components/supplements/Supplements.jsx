import Supplement from "../supplement/Supplement";
import "./Supplements.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Supliments = ({ userName }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/supplements/all`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return <div className="supliments">
    {posts.map(post => (
      <Supplement supplement={post} userName={userName} key={post.id} />
    ))}
  </div>;
};

export default Supliments;
