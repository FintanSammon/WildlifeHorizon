import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function ProductDetails() {
    const [quantity, setQuantity] = useState(1);
    const location = useLocation();
    console.log('Location object:', location);  // <-- Added console log

    const product = location.state?.product;

    if (!product) {
        return <div>Product details not available!</div>;
    }

    return (
        <div>
            {/* Product Image */}
            <div>
                <button>{"<"}</button>
                <img src={product.image} alt={product.name} style={{ width: '300px', height: '300px' }} />
                <button>{">"}</button>
            </div>

            {/* Product Name */}
            <h1>{product.name}</h1>
            
            {/* Product Price */}
            <h2>{product.price}</h2>

            {/* Product Description */}
            <p>{product.description}</p>

            {/* Size Selector */}
            <div>
                Size *
                <select>
                    {/* Populate this dropdown with sizes */}
                    <option value="S">S</option>
                    {/* Add other sizes */}
                </select>
            </div>
            
            {/* Quantity Selector */}
            <div>
                Quantity: 
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div>
            
            {/* Add to Cart Button */}
            <button onClick={() => {/* Add to cart logic here */}}>Add to Cart</button>
        </div>
    );
}

export default ProductDetails;
