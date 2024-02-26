import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ProductItem = ({ product, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <Link to={`/shop/${product.id}`} state={{ product }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
        animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : (index % 2 === 0 ? -100 : 100) }}
        transition={{ duration: 1 }}
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
