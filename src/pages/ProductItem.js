import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ProductItem = ({ product, index }) => {
  // State and hook to observe element visibility
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // State to determine screen size
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

  // Effect hook to handle window resize
  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth >= 768);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation properties based on screen size
  const animationProps = isLargeScreen ? {
    initial: { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
    animate: { opacity: inView ? 1 : 0, x: inView ? 0 : (index % 2 === 0 ? -100 : 100) },
    transition: { duration: 1 }
  } : {
    initial: { opacity: 1, x: 0 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0 } 
  };

  // Rendering product item
  return (
    <Link to={`/shop/${product.id}`} state={{ product }}>
      <motion.div
        ref={ref}
        {...animationProps}
        className="product"
      >
        <img src={product.image} alt={product.name} className="product-image"/>
        <p className="product-name">{product.name}</p>
        <p className="product-price">€{product.price}</p>
      </motion.div>
    </Link>
  );
};

export default ProductItem;