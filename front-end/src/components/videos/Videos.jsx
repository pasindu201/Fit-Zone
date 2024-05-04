import { useState, useEffect } from "react";
import Video from "../video/Video";
import "./Videos.scss";
import axios from 'axios'

const Videos = ({userName}) => {
  const[VideoPost, setVideoPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/videos/getAll`);
        setVideoPost(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="videos">
      {VideoPost.map(video => (
        <Video video={video} userName={userName} key={video.id} />
      ))}
    </div>
  );
};

export default Videos;
