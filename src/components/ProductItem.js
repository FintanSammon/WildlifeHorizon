import React from 'react';
import './ProductItem.css'; 

function ProductItem({ product }) {
  return (
    <div className="product">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price}</p>
      <div className="product-interaction">
        <button className="quick-view-button">Quick View</button>
      </div>
    </div>
  );
}

export default ProductItem;
