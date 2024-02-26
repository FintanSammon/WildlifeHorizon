import React from 'react';
import { useInView } from 'react-intersection-observer';

function ImageTextComponent({ src, alt, description, index }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className={`image-text-container ${inView ? 'slide-in' : ''} ${isEven ? '' : 'row-reverse'}`}>
      <div className="image-container">
        <img src={src} alt={alt} className="game-image" loading="lazy" />
      </div>
      <div className="text-container">
        <p className="image-description">{description}</p>
      </div>
    </div>
  );
}

export default ImageTextComponent;
