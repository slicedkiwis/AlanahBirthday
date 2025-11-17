import React, { useEffect, useState } from 'react';

const HeartAnimation = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const createHeart = () => {
      const heart = {
        id: Math.random(),
        left: Math.random() * 100,
        size: Math.random() * 10 + 15,
        animationDelay: Math.random() * 2
      };
      
      setHearts(prev => [...prev, heart]);
      
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== heart.id));
      }, 6000);
    };

    const interval = setInterval(createHeart, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="heart"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDelay: `${heart.animationDelay}s`,
            color: '#ff69b4',
            bottom: 0,
            top: 'auto'
          }}
        >
          ♥
        </div>
      ))}
    </>
  );
};

export default HeartAnimation;