import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <div style={{ marginBottom: '2rem', filter: 'drop-shadow(0 0 30px rgba(255, 107, 157, 0.6))' }}>
        🩷
      </div>
      <h1 className="title">Happy Birthday Alanah!</h1>
      <p className="subtitle">Let's take a trip down memory lane...</p>
      
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '30px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        maxWidth: '600px'
      }}>
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#555', 
          textAlign: 'center', 
          margin: '0',
          lineHeight: '1.6'
        }}>
          Get ready to relive some of our beautiful moments together through the places that made our love story special ✨
        </p>
      </div>
      
      <button 
        className="button"
        onClick={() => navigate('/map')}
      >
        Start Our Journey 💕
      </button>
      
      <p style={{
        marginTop: '2rem',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.9rem',
        fontStyle: 'italic'
      }}>
        Click on each memory marker to unlock our story...
      </p>
    </div>
  );
};

export default WelcomeScreen;