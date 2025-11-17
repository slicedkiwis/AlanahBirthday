import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MusicPlayer from './MusicPlayer';
import { imageLocations } from '../utils/imageMetadata';

const MapScreen = () => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [visitedMarkers, setVisitedMarkers] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [memories, setMemories] = useState([]);
  const [completedMemories, setCompletedMemories] = useState([]);
  
  // Convert imageLocations to memory format
  useEffect(() => {
    const memoryData = imageLocations.map((location, index) => ({
      id: index + 1,
      title: location.title,
      description: location.description,
      image: `/static/${location.image}`,
      location: location.coordinates,
      color: '#ff6b9d',
      date: 'Special Day',
      city: 'Our Memory'
    }));
    setMemories(memoryData);
  }, []);
  
  const handleMemorySelect = (memory) => {
    setSelectedLocation(memory);
    if (!completedMemories.includes(memory.id)) {
      setCompletedMemories(prev => [...prev, memory.id]);
    }
    if (!visitedMarkers.includes(memory.image.replace('/static/', ''))) {
      setVisitedMarkers(prev => [...prev, memory.image.replace('/static/', '')]);
    }
  };

  useEffect(() => {
    if (window.google && mapRef.current && memories.length > 0 && !map) {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: memories[0].location,
        zoom: 8,
        styles: [
          {
            featureType: 'landscape.natural',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'poi.park',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'landscape.natural.landcover',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'landscape.natural.terrain',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      memories.forEach((memory, index) => {
        const isCompleted = completedMemories.includes(memory.id);
        const markerColor = isCompleted ? '#ff6b9d' : '#cccccc';
        
        const marker = new window.google.maps.Marker({
          position: memory.location,
          map: mapInstance,
          title: memory.title,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0C9 0 0 9 0 20c0 15 20 30 20 30s20-15 20-30C40 9 31 0 20 0zm0 28c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" fill="${markerColor}" stroke="white" stroke-width="2"/>
                <text x="20" y="25" text-anchor="middle" fill="white" font-size="10" font-weight="bold">${index + 1}</text>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(40, 50)
          }
        });

        marker.addListener('click', () => {
          handleMemorySelect(memory);
          // Update marker color after click
          marker.setIcon({
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0C9 0 0 9 0 20c0 15 20 30 20 30s20-15 20-30C40 9 31 0 20 0zm0 28c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" fill="#ff6b9d" stroke="white" stroke-width="2"/>
                <text x="20" y="25" text-anchor="middle" fill="white" font-size="10" font-weight="bold">${index + 1}</text>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(40, 50)
          });
        });
      });

      setMap(mapInstance);
    }
  }, [memories, map]);

  useEffect(() => {
    if (completedMemories.length === memories.length && memories.length > 0) {
      setTimeout(() => navigate('/summary'), 2000);
    }
  }, [completedMemories, memories.length, navigate]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <MusicPlayer />
      
      <div style={{ flex: 1 }}>
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      </div>

      <div style={{
        width: '400px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '2rem',
        overflowY: 'auto',
        boxShadow: '-5px 0 20px rgba(0, 0, 0, 0.1)',
        zIndex: 10
      }}>
        <div style={{
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '2px solid #f0f0f0'
        }}>
          <h3 style={{ 
            fontFamily: 'Arial, sans-serif',
            fontSize: '2rem',
            color: '#333',
            marginBottom: '0.5rem',
            textAlign: 'center'
          }}>
            Our Memory Lane 💕
          </h3>
          <div style={{ 
            color: '#666',
            fontSize: '0.9rem',
            fontFamily: 'Arial, sans-serif',
            textAlign: 'center'
          }}>
            {completedMemories.length} of {memories.length} memories visited
          </div>
        </div>

        {memories.filter(memory => completedMemories.includes(memory.id)).map(memory => {
          return (
            <div key={memory.id} style={{
              background: 'white',
              borderRadius: '15px',
              padding: '15px',
              marginBottom: '15px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              border: '3px solid #ff6b9d',
              transition: 'transform 0.3s ease'
            }}>
              <img 
                src={memory.image}
                alt={memory.title}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  marginBottom: '10px'
                }}
              />
              <h4 style={{ color: '#333', fontSize: '16px', marginBottom: '5px', fontFamily: 'Arial, sans-serif' }}>
                {memory.title}
              </h4>
              <p style={{ color: '#666', fontSize: '14px', fontFamily: 'Arial, sans-serif' }}>
                {memory.description}
              </p>
            </div>
          );
        })}

        {selectedLocation && (
          <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '20px',
              maxWidth: '500px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              borderTop: '5px solid #ff6b9d'
            }}>
              <div style={{
                position: 'relative',
                width: '100%',
                height: '250px',
                overflow: 'hidden'
              }}>
                <img 
                  src={selectedLocation.image}
                  alt={selectedLocation.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <button 
                  onClick={() => setSelectedLocation(null)}
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
                    zIndex: 10,
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  ✕
                </button>
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ 
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '2rem',
                  color: '#333',
                  marginBottom: '1rem'
                }}>
                  {selectedLocation.title}
                </h3>
                <p style={{ 
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: '#555',
                  marginBottom: '1.5rem',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {selectedLocation.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapScreen;