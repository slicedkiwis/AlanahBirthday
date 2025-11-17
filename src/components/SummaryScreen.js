import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { imageLocations } from '../utils/imageMetadata';
import MusicPlayer from './MusicPlayer';

const SummaryScreen = () => {
  const navigate = useNavigate();
  const [selectedMemory, setSelectedMemory] = useState(null);

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', overflowY: 'auto' }}>
      <MusicPlayer />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem', filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))', fontSize: '3rem', textAlign: 'center' }}>
          ✨
        </div>
        
        <h1 className="title">Our Beautiful Journey Together</h1>
        <p className="subtitle">Every moment, every memory, every laugh we've shared...</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '40px',
          marginTop: '30px'
        }}>
        {imageLocations.map((location, index) => (
          <div key={index} 
            onClick={() => setSelectedMemory(location)}
            style={{
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
              src={location.image}
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

        <div style={{ textAlign: 'center', paddingBottom: '40px' }}>
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
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="button"
              onClick={() => navigate('/final')}
              style={{ fontSize: '20px', padding: '20px 40px' }}
            >
              Continue to Final Message 💖
            </button>
            <button 
              className="button"
              onClick={() => navigate('/')}
              style={{ fontSize: '20px', padding: '20px 40px', background: 'rgba(255, 255, 255, 0.9)', color: '#ff6b9d', border: '2px solid #ff6b9d' }}
            >
              Start Over 🔄
            </button>
          </div>
        </div>

        {selectedMemory && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
            padding: '20px'
          }}
          onClick={() => setSelectedMemory(null)}
          >
            <div style={{
              background: 'white',
              borderRadius: '20px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              animation: 'slideIn 0.3s ease-out',
              borderTop: '5px solid #ff6b9d'
            }}
            onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMemory(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  fontSize: '20px',
                  zIndex: 10,
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
                }}
              >
                ✕
              </button>
              <img
                src={selectedMemory.image}
                alt={selectedMemory.title}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '20px 20px 0 0'
                }}
              />
              <div style={{ padding: '2rem' }}>
                <h2 style={{
                  fontSize: '2rem',
                  color: '#333',
                  marginBottom: '1rem',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {selectedMemory.title}
                </h2>
                <p style={{
                  fontSize: '1.2rem',
                  lineHeight: '1.8',
                  color: '#555',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {selectedMemory.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryScreen;