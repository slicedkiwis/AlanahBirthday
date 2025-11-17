import React, { useRef, useEffect, useState } from 'react';

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 9.6;
      audio.loop = true;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      padding: '15px',
      borderRadius: '15px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      zIndex: 1000
    }}>
      <audio ref={audioRef} src="/static/chopin-nocturne-op9-no2.mp3.mp3" />
      <button
        onClick={togglePlay}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          color: '#d63384'
        }}
      >
        {isPlaying ? '⏸️' : '▶️'}
      </button>
      <span style={{ marginLeft: '10px', color: '#666', fontSize: '14px', fontFamily: 'Arial, sans-serif' }}>
        Our Song 🎵
      </span>
    </div>
  );
};

export default MusicPlayer;