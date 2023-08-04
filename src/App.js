import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import './App.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchVideos = () => {
    axios.get('https://bytesotech.cloud/target/api/ads/status/1')
      .then((response) => {
        setVideos(response.data);
        setCurrentIndex(0);
      })
      .catch((error) => {
        console.error('Error fetching videos:', error);
      });
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleVideoEnd = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <div className="app">
      {videos.length > 0 ? (
        <ReactPlayer
          key={videos[currentIndex]?.id}
          url={videos[currentIndex]?.video}
          playing={true}
          loop={false} // Remove looping for individual video play
          controls={false}
          width="100%"
          height="100%"
          onEnded={handleVideoEnd}
        />
      ) : (
        <div className="welcome-text">Welcome to Target Marketing</div>
      )}
    </div>
  );
}

export default App;
