import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MusicPlayer from './MusicPlayer';
import LazyImage from './LazyImage';
import { imageLocations } from '../utils/imageMetadata';
import { usePerformance } from '../hooks/usePerformance';
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const MapScreen = () => {
  usePerformance('MapScreen');
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [visitedMarkers, setVisitedMarkers] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [memories, setMemories] = useState([]);
  const [completedMemories, setCompletedMemories] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const markersRef = useRef([]);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Load Google Maps API
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google) {
        setIsMapLoading(false);
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDTyBgvYaBVGYJR0jZixVMJf-kbbHaIuFs&libraries=places';
      script.async = true;
      script.onload = () => setIsMapLoading(false);
      script.onerror = () => {
        console.error('Failed to load Google Maps');
        setIsMapLoading(false);
      };
      document.head.appendChild(script);
    };
    
    loadGoogleMaps();
  }, []);
  
  // Convert imageLocations to memory format
  useEffect(() => {
    const memoryData = imageLocations.map((location, index) => ({
      id: index + 1,
      title: location.title,
      description: location.description,
      src: location.src,
      webpSrc: location.webpSrc,
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
    if (!isMapLoading && window.google && mapRef.current && memories.length > 0 && !map) {
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
  }, [memories, map, isMapLoading]);
  
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
    <div style={{ 
      display: 'flex', 
      height: '100vh',
      flexDirection: isMobile ? 'column' : 'row'
    }}>
      <MusicPlayer />
      
      <div style={{ 
        flex: 1,
        minHeight: isMobile ? '50vh' : '100vh',
        position: 'relative'
      }}>
        {isMapLoading ? (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f5f5f5'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #ff6b9d',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 1rem'
              }} />
              <p style={{ color: '#666', fontSize: '1rem' }}>Loading map...</p>
            </div>
          </div>
        ) : (
          <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
        )}
      </div>

      <div style={{
        width: isMobile ? '100%' : '30vw',
        maxWidth: isMobile ? 'none' : '35rem',
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(1.25rem)',
        padding: isMobile ? '1rem' : '2rem',
        overflowY: 'auto',
        boxShadow: isMobile ? '0 -0.3rem 1.25rem rgba(0, 0, 0, 0.15)' : '-0.3rem 0 1.25rem rgba(0, 0, 0, 0.15)',
        zIndex: 10,
        maxHeight: isMobile ? '50vh' : '100vh'
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
                background: isCompleted ? 'rgba(255, 107, 157, 0.08)' : 'transparent',
                opacity: isCompleted ? 1 : 0.6
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
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: isCompleted ? '#ff6b9d' : '#ccc',
                    color: 'white',
                    fontSize: '1.125rem',
                    fontWeight: 'bold',
                    boxShadow: isCompleted ? '0 0 1.25rem rgba(255, 107, 157, 0.5)' : 'none',
                    zIndex: 2,
                    flexShrink: 0
                  }}>
                    {isCompleted ? '✓' : '🔒'}
                  </div>
                  {index < memories.length - 1 && (
                    <div style={{
                      width: '0.125rem',
                      flex: 1,
                      background: isCompleted ? 'linear-gradient(to bottom, #ff6b9d, #c44569)' : '#e0e0e0',
                      marginTop: '0.5rem',
                      minHeight: '2rem',
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
                    width: '5rem',
                    height: '5rem',
                    borderRadius: '0.625rem',
                    overflow: 'hidden',
                    flexShrink: 0,
                    opacity: isCompleted ? 1 : 0.3,
                    filter: isCompleted ? 'none' : 'grayscale(100%)'
                  }}>
                    <LazyImage 
                      src={memory.src}
                      webpSrc={memory.webpSrc}
                      alt={memory.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: memory.title === 'Painting in the Park' ? 'center 15%' : 'center'
                      }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: '#333',
                      marginBottom: '0.25rem',
                      wordWrap: 'break-word',
                      lineHeight: '1.3',
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
                      <p style={{
                        fontSize: '0.8rem',
                        color: '#666',
                        marginBottom: '0.5rem',
                        fontFamily: 'Arial, sans-serif',
                        lineHeight: '1.4'
                      }}>
                        {memory.description}
                      </p>
                    )}
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

      </div>
      
      {selectedLocation && (
        <div 
          onClick={() => setSelectedLocation(null)}
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '1rem',
            background: 'rgba(0, 0, 0, 0.5)'
          }}>
            <div 
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'white',
                borderRadius: '1.25rem',
                maxWidth: '40vw',
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto',
                position: 'relative',
                boxShadow: '0 1.25rem 3.75rem rgba(0, 0, 0, 0.3)',
                borderTop: '0.3rem solid #ff6b9d'
              }}>
              <div style={{
                position: 'relative',
                width: '100%',
                height: '40vh',
                overflow: 'hidden'
              }}>
                <LazyImage 
                  src={selectedLocation.src}
                  webpSrc={selectedLocation.webpSrc}
                  alt={selectedLocation.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: selectedLocation.title === 'Painting in the Park' ? 'center 15%' : 'center'
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
                    width: '2.5rem',
                    height: '2.5rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    transition: 'all 0.3s ease',
                    boxShadow: '0 0.125rem 0.625rem rgba(0, 0, 0, 0.1)',
                    fontSize: '1.5rem'
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
                  marginBottom: '0.5rem'
                }}>
                  {selectedLocation.title}
                </h3>
                <p style={{ 
                  fontSize: '1rem',
                  color: '#ff6b9d',
                  marginBottom: '1rem',
                  fontWeight: '600',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {selectedLocation.date}
                </p>
                <p style={{ 
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: '#555',
                  marginBottom: '1.5rem',
                  fontFamily: 'Arial, sans-serif',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word'
                }}>
                  {selectedLocation.description}
                </p>
              </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default MapScreen;