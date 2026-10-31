import { useState } from 'react';

export default function SmartImage({
  src,
  alt = 'WORTH Association',
  className = '',
  imgClassName = '',
  aspectRatio,
  priority = false,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Fallback gradient placeholder with WORTH mark
  if (hasError || !src) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-[#FBE9E4] via-[#FDF7F4] to-[#FBE9E4] flex flex-col items-center justify-center p-6 text-center border border-rose-200/40 ${className}`}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <div className="w-12 h-12 rounded-full bg-signature-gradient flex items-center justify-center text-white font-jost font-bold text-xl shadow-md mb-2">
          W
        </div>
        <span className="text-xs uppercase tracking-widest font-jost font-semibold text-[#9C1F5A]">
          WORTH Association
        </span>
        <span className="text-[11px] text-[#6B5E62] mt-1 line-clamp-1 max-w-[200px]">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Shimmering blush skeleton loader */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#FBE9E4] animate-shimmer z-10" />
      )}

      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
        {...props}
      />
    </div>
  );
}
