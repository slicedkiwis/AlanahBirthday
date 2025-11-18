/*import { useEffect } from 'react';

export const usePerformance = (componentName) => {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      if (renderTime > 100) {
        console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
      }
    };
  });
};

export const logImageLoad = (imageName, startTime) => {
  const loadTime = performance.now() - startTime;
  if (loadTime > 500) {
    console.log(`Slow image load - ${imageName}: ${loadTime.toFixed(2)}ms`);
  }
};*/