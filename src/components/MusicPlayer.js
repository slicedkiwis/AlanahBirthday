import React, { useRef, useEffect, useState } from 'react';

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 9.6;
      audio.loop = true;
      audio.volume = 0.3;
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
    <>
      <audio ref={audioRef} src={process.env.PUBLIC_URL + '/static/chopin-nocturne-op9-no2.mp3.mp3'} />
      
      {showPlayer ? (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '16px 20px 24px 20px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          zIndex: 1000,
          minWidth: '280px',
          fontFamily: 'Arial, sans-serif'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
            <button
              onClick={togglePlay}
              style={{
                background: 'linear-gradient(135deg, #ff6b9d, #c44569)',
                border: 'none',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                color: 'white',
                fontSize: '16px',
                boxShadow: '0 4px 12px rgba(255, 107, 157, 0.3)'
              }}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{ 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#333',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'block'
              }}>
                {isPlaying ? "🎂 Alanah's Birthday Serenade" : "Click to play music"}
              </span>
            </div>
            <button
              onClick={() => setShowPlayer(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#999',
                cursor: 'pointer',
                fontSize: '16px',
                padding: '4px',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              ✕
            </button>
          </div>
          {isPlaying && (
            <div style={{
              position: 'absolute',
              bottom: '4px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '3px',
              height: '12px',
              pointerEvents: 'none'
            }}>
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '4px',
                    background: 'linear-gradient(135deg, #ff6b9d, #c44569)',
                    borderRadius: '2px',
                    animation: `wave 0.8s ease-in-out infinite`,
                    animationDelay: `${i * 0.1}s`,
                    opacity: 0.8
                  }}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setShowPlayer(true)}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'linear-gradient(135deg, #ff6b9d, #c44569)',
            border: 'none',
            borderRadius: '50%',
            width: '56px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '24px',
            boxShadow: '0 8px 24px rgba(255, 107, 157, 0.3)',
            zIndex: 1000,
            transition: 'all 0.3s ease'
          }}
        >
          🎵
        </button>
      )}
    </>
  );
};

export default MusicPlayer;