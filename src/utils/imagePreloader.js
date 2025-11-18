// Preload critical images
export const preloadCriticalImages = (imagePaths) => {
  imagePaths.slice(0, 3).forEach(path => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = path;
    document.head.appendChild(link);
  });
};