import React from 'react';
import { Link } from 'react-router-dom';
import './EcommercePage.css';
import zebraImage from './images/zebra.jpeg';

function EcommercePage() {

    const products = [
        { id: 1, image: zebraImage, name: "Zebra Poster 1", price: "$30.00" },
        { id: 2, image: zebraImage, name: "Zebra Poster 2", price: "$30.00" },
        { id: 3, image: zebraImage, name: "Zebra Poster 3", price: "$30.00" },
        { id: 4, image: zebraImage, name: "Zebra Poster 4", price: "$30.00" },
    ];

    return (
        <div className="ecommerce-container">
            <div className="content-wrapper">
                <h1>Shop Page</h1>
                <div className="shop-container">
                    {products.map(product => (
                        <Link to={{pathname: `/shop/${product.id}`, state: { product }}} key={product.id}>
                            <div className="product">
                                <img src={product.image} alt={product.name} className="product-image"/>
                                <p>{product.name}</p>
                                <p>{product.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EcommercePage;
