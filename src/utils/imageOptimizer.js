// WebP optimization with JPEG fallback
export const getOptimizedImagePath = (filename) => {
  const basePath = `${process.env.PUBLIC_URL}/static/`;
  const webpFilename = filename.replace(/\.(jpeg|jpg)$/i, '.webp');
  
  return {
    webp: `${basePath}${webpFilename}`,
    fallback: `${basePath}${filename}`
  };
};

// Check WebP support
export const supportsWebP = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};