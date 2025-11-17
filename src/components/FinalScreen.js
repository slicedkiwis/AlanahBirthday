import React from 'react';
import { useNavigate } from 'react-router-dom';
import MusicPlayer from './MusicPlayer';

const FinalScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <MusicPlayer />
      
      <div style={{ textAlign: 'center', maxWidth: '800px' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ 
            filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))',
            fontSize: '3rem',
            marginBottom: '1rem'
          }}>
            ✨
          </div>
        </div>
        
        <h1 style={{ 
          fontFamily: 'Arial, sans-serif',
          fontSize: '4rem',
          color: 'white',
          marginBottom: '1.5rem',
          textShadow: '0 3px 30px rgba(0, 0, 0, 0.3)',
          lineHeight: '1.2'
        }}>
          Happy Birthday, My Love!
        </h1>
        
        <div style={{
          margin: '2rem auto',
          filter: 'drop-shadow(0 0 20px rgba(255, 107, 157, 0.6))',
          fontSize: '2rem'
        }}>
          💖
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '2.5rem',
          borderRadius: '20px',
          marginBottom: '2rem',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
        }}>
          <p style={{ 
            fontSize: '1.2rem', 
            lineHeight: '1.8',
            color: '#555',
            marginBottom: '1.5rem',
            fontWeight: '300',
            fontFamily: 'Arial, sans-serif'
          }}>
            As we've journeyed through all these beautiful memories together, 
            I'm reminded of how lucky I am to have you in my life. 💕
          </p>

          <p style={{ 
            fontSize: '1.2rem', 
            lineHeight: '1.8',
            color: '#555',
            marginBottom: '1.5rem',
            fontWeight: '300',
            fontFamily: 'Arial, sans-serif'
          }}>
            Every place we've been, every moment we've shared, every laugh, 
            every adventure - they've all been made infinitely more special 
            because I got to experience them with you. 🌟
          </p>

          <p style={{ 
            fontSize: '1.3rem',
            lineHeight: '1.8',
            color: '#ff6b9d',
            fontWeight: '600',
            fontStyle: 'italic',
            margin: '0',
            fontFamily: 'Arial, sans-serif'
          }}>
            Here's to many more memories to come, many more places to explore, 
            and many more birthdays to celebrate together! 🥂
          </p>
        </div>

        <div style={{
          color: 'white',
          fontSize: '1.2rem',
          marginTop: '2rem',
          fontFamily: 'Arial, sans-serif'
        }}>
          <p style={{ margin: '0.5rem 0' }}>
            I Love You More Than Words Can Say 💖
          </p>
          <div style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '2rem',
            fontWeight: '700',
            textShadow: '0 2px 15px rgba(0, 0, 0, 0.3)',
            marginTop: '1rem'
          }}>
            Happy Birthday, Beautiful! 🎉🎂🎈
          </div>
        </div>

        <button 
          onClick={() => navigate('/')}
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            border: '2px solid #ff6b9d',
            color: '#ff6b9d',
            padding: '12px 30px',
            borderRadius: '25px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '2rem',
            transition: 'all 0.3s ease',
            fontFamily: 'Arial, sans-serif'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#ff6b9d';
            e.target.style.color = 'white';
            e.target.style.boxShadow = '0 5px 15px rgba(255, 107, 157, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.9)';
            e.target.style.color = '#ff6b9d';
            e.target.style.boxShadow = 'none';
          }}
        >
          Start Our Journey Again 🔄💕
        </button>
      </div>
    </div>
  );
};

export default FinalScreen;