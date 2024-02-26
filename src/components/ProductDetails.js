import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useCart } from '../contexts/CartContext'; 
import './ProductDetails.css';

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart(); 
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('M');

  useEffect(() => {
    async function fetchProduct() {
      const docRef = doc(db, 'Products', productId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such product!");
      }
    }

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    addToCart(product, quantity, size);
    console.log('Product added to cart with size:', size);
  };

  if (!product) {
    return <div className="product-details-loading">Loading...</div>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details-card">
        <div className="product-details-image-container">
          <img src={product.image} alt={product.name} className="product-details-image" />
        </div>
        <div className="product-details-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">Price:€ {product.price}</p>
          <p className="product-description">{product.description}</p>
          <div className="product-quantity-size">
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min={1}
              className="quantity-input"
            />
            Size:
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="size-select"
            >
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
              <option value="XL">Extra Large</option>
            </select>
          </div>
          <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
