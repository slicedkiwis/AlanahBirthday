import React from 'react';
import { useNavigate } from 'react-router-dom';
import { imageLocations } from '../utils/imageMetadata';
import MusicPlayer from './MusicPlayer';

const SummaryScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="screen" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <MusicPlayer />
      
      <div style={{ marginBottom: '2rem', filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))' }}>
        ✨
      </div>
      
      <h1 className="title">Our Beautiful Journey Together</h1>
      <p className="subtitle">Every moment, every memory, every laugh we've shared...</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '40px',
        marginTop: '30px'
      }}>
        {imageLocations.map((location, index) => (
          <div key={location.image} style={{
            background: 'white',
            borderRadius: '15px',
            padding: '20px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            border: '3px solid #ff6b9d',
            transition: 'transform 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{
              background: `linear-gradient(45deg, #ff69b4, #ff1493)`,
              color: 'white',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: '15px'
            }}>
              {index + 1}
            </div>
            
            <img 
              src={`/static/${location.image}`}
              alt={location.title}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '15px',
                marginBottom: '15px'
              }}
            />
            
            <h3 style={{ color: '#333', fontSize: '18px', marginBottom: '10px', fontFamily: 'Arial, sans-serif' }}>
              {location.title}
            </h3>
            
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5', fontFamily: 'Arial, sans-serif' }}>
              {location.description}
            </p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '2.5rem',
          borderRadius: '20px',
          marginBottom: '2rem',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          maxWidth: '600px',
          margin: '0 auto 2rem auto'
        }}>
          <p style={{ 
            fontSize: '1.3rem', 
            color: '#ff6b9d', 
            margin: '0',
            fontStyle: 'italic',
            fontWeight: '600',
            lineHeight: '1.8',
            fontFamily: 'Arial, sans-serif'
          }}>
            "Every picture tells a story, but together they tell our love story... 
            and this is just the beginning! ✨"
          </p>
        </div>
        
        <button 
          className="button"
          onClick={() => navigate('/final')}
          style={{ fontSize: '20px', padding: '20px 40px' }}
        >
          Continue to Final Message 💖
        </button>
      </div>
    </div>
  );
};

export default SummaryScreen;