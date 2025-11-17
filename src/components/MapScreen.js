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
  const [markers, setMarkers] = useState([]);
  const markersRef = useRef([]);
  
  // Convert imageLocations to memory format
  useEffect(() => {
    const memoryData = imageLocations.map((location, index) => ({
      id: index + 1,
      title: location.title,
      description: location.description,
      image: location.image,
      location: location.coordinates,
      color: '#ff6b9d',
      date: location.date,
      city: 'Our Memory'
    }));
    setMemories(memoryData);
  }, []);
  
  const handleMemorySelect = (memory) => {
    setSelectedLocation(memory);
    if (!completedMemories.includes(memory.id)) {
      setCompletedMemories(prev => [...prev, memory.id]);
    }
    if (!visitedMarkers.includes(memory.id)) {
      setVisitedMarkers(prev => [...prev, memory.id]);
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

      const newMarkers = memories.map((memory, index) => {
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
        });
        
        return { marker, memoryId: memory.id, index };
      });

      markersRef.current = newMarkers;
      setMarkers(newMarkers);
      setMap(mapInstance);
    }
  }, [memories, map]);
  
  // Update marker colors when completedMemories changes
  useEffect(() => {
    markersRef.current.forEach(({ marker, memoryId, index }) => {
      const isCompleted = completedMemories.includes(memoryId);
      const markerColor = isCompleted ? '#ff6b9d' : '#cccccc';
      
      marker.setIcon({
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 0C9 0 0 9 0 20c0 15 20 30 20 30s20-15 20-30C40 9 31 0 20 0zm0 28c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" fill="${markerColor}" stroke="white" stroke-width="2"/>
            <text x="20" y="25" text-anchor="middle" fill="white" font-size="10" font-weight="bold">${index + 1}</text>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(40, 50)
      });
    });
  }, [completedMemories]);

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
            marginBottom: '0.5rem'
          }}>
            Our Journey
          </h3>
          <p style={{ 
            color: '#666',
            fontSize: '0.9rem',
            fontFamily: 'Arial, sans-serif'
          }}>
            {completedMemories.length} / {memories.length} explored
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {memories
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((memory, index) => {
            const isCompleted = completedMemories.includes(memory.id);
            return (
              <div key={memory.id} style={{
                display: 'flex',
                gap: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: '0.5rem',
                borderRadius: '10px',
                background: isCompleted ? 'rgba(255, 107, 157, 0.05)' : 'transparent',
                opacity: isCompleted ? 1 : 0.5
              }}
              onClick={() => handleMemorySelect(memory)}
              >
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: isCompleted ? '#ff6b9d' : '#ccc',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    boxShadow: isCompleted ? '0 0 20px rgba(255, 107, 157, 0.5)' : 'none',
                    zIndex: 2,
                    flexShrink: 0
                  }}>
                    {isCompleted ? '✓' : '🔒'}
                  </div>
                  {index < memories.length - 1 && (
                    <div style={{
                      width: '2px',
                      flex: 1,
                      background: isCompleted ? 'linear-gradient(to bottom, #ff6b9d, #c44569)' : '#e0e0e0',
                      marginTop: '0.5rem',
                      minHeight: '30px',
                      transition: 'all 0.3s ease'
                    }} />
                  )}
                </div>

                <div style={{
                  flex: 1,
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    opacity: isCompleted ? 1 : 0.3,
                    filter: isCompleted ? 'none' : 'grayscale(100%)'
                  }}>
                    <img 
                      src={memory.image}
                      alt={memory.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#333',
                      marginBottom: '0.25rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      fontFamily: 'Arial, sans-serif'
                    }}>
                      {memory.title}
                    </h4>
                    <p style={{
                      fontSize: '0.85rem',
                      color: '#999',
                      marginBottom: '0.5rem',
                      fontFamily: 'Arial, sans-serif'
                    }}>
                      {memory.date}
                    </p>
                    {isCompleted && (
                      <div style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        color: 'white',
                        fontWeight: '500',
                        background: '#ff6b9d',
                        fontFamily: 'Arial, sans-serif'
                      }}>
                        Discovered ✨
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {completedMemories.length === memories.length && (
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
            borderRadius: '15px',
            textAlign: 'center',
            color: 'white'
          }}>
            <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', fontFamily: 'Arial, sans-serif' }}>
              🎉 All memories discovered!
            </p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.9, fontWeight: '400', fontFamily: 'Arial, sans-serif' }}>
              Preparing something special...
            </p>
          </div>
        )}

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