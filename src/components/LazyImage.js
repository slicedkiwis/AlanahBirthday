import React, { useState, useRef, useEffect } from 'react';
import { supportsWebP } from '../utils/imageOptimizer';

const LazyImage = ({ src, webpSrc, alt, style, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView) {
      const useWebP = webpSrc && supportsWebP();
      setImageSrc(useWebP ? webpSrc : src);
    }
  }, [isInView, src, webpSrc]);

  return (
    <div ref={imgRef} style={style}>
      {!isLoaded && (
        <div style={{
          ...style,
          background: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999'
        }}>
          📷
        </div>
      )}
      {isInView && imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            if (imageSrc !== src) {
              setImageSrc(src); // Fallback to JPEG
            }
          }}
          style={{
            ...style,
            display: isLoaded ? 'block' : 'none'
          }}
          {...props}
        />
      )}
    </div>
  );
};

export default LazyImage;