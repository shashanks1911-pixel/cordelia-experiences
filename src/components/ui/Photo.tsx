import { useState, type ImgHTMLAttributes } from 'react';

interface PhotoProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

/**
 * Image on a sunrise-gradient slot. If the photo fails to load, the slot
 * stays as an intentional gradient surface instead of a broken image.
 */
export default function Photo({ src, alt, className = '', ...rest }: PhotoProps) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={`img-slot block overflow-hidden ${className}`}>
      {!failed && (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
          {...rest}
        />
      )}
    </span>
  );
}
