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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, videos.length > 0 ? 60000 : 0); // 60 seconds if there are videos, 0 otherwise

    return () => clearInterval(interval);
  }, [videos]);

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
          onEnded={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length)}
        />
      ) : (
        <div className="welcome-text">Welcome to Target Marketing</div>
      )}
    </div>
  );
}

export default App;
