import React, { useState, useEffect } from 'react';

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  widthLimit?: number;
  qualityLimit?: number;
}

export function getOptimizedImageUrl(url: string, width = 800, quality = 70): string {
  if (!url) return '';
  if (url.includes('unsplash.com')) {
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.set('auto', 'format');
      urlObj.searchParams.set('fm', 'webp'); // Serve modern WebP instead of heavy JPEGs
      urlObj.searchParams.set('q', quality.toString());
      if (width) {
        urlObj.searchParams.set('w', width.toString());
      }
      return urlObj.toString();
    } catch (e) {
      // Fallback robust string manipulation
      let optimized = url;
      if (!optimized.includes('fm=webp')) {
        optimized += '&fm=webp';
      }
      return optimized;
    }
  }
  return url;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  widthLimit = 800,
  qualityLimit = 70,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [optimizedSrc, setOptimizedSrc] = useState('');

  useEffect(() => {
    // Generate optimized image URL (e.g., convert Unsplash to WebP and set reasonable width)
    setOptimizedSrc(getOptimizedImageUrl(src, widthLimit, qualityLimit));
    // Reset loaded state when source changes
    setIsLoaded(false);
  }, [src, widthLimit, qualityLimit]);

  return (
    <div className={`relative overflow-hidden w-full h-full bg-slate-100 ${containerClassName}`}>
      {/* CSS Pulse Shimmer Skeleton Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-pulse z-10">
          <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      )}
      
      {/* Actual image fading in over placeholder */}
      {optimizedSrc && (
        <img
          src={optimizedSrc}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
