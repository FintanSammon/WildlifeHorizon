import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { collection, getDocs, query as firestoreQuery, where } from "firebase/firestore"; 
import { db } from '../firebase/firebaseConfig'; 
import './EcommercePage.css';
import ProductItem from './ProductItem';

// Custom hook to get URL query parameters
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function EcommercePage() {
    const [products, setProducts] = useState([]); // State to store products
    const [loading, setLoading] = useState(true); // State to manage loading status
    const location = useLocation(); // Getting current location
    const urlQuery = useQuery(); // Getting URL query parameters
    const filter = urlQuery.get('category') || 'all'; // Setting filter based on URL query parameter

    // Fetching products from Firestore based on filter
    useEffect(() => {
        async function getProducts() {
            try {
                let q;
                if (filter === 'all') {
                    q = collection(db, "Products");
                } else {
                    q = firestoreQuery(collection(db, "Products"), where("category", "==", filter));
                }

                const querySnapshot = await getDocs(q);
                setProducts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        }

        getProducts();
    }, [filter, location]); // Dependency array for useEffect

    return (
        <div className="ecommerce-container">
            <div className="content-wrapper">
                <h1>Explore Our Collection</h1>
                <p>Find the perfect addition to your wardrobe and home with our exclusive t-shirts, cups, and posters.</p>
                <div className="filter-container">
                    {/* Filter links */}
                    <Link to="/shop?category=all">All</Link>
                    <Link to="/shop?category=cups">Cups</Link>
                    <Link to="/shop?category=posters">Posters</Link>
                    <Link to="/shop?category=tshirts">T-Shirts</Link>
                </div>

                {/* Displaying products */}
                {loading ? <p>Loading products...</p> : (
                    <div className="shop-container">
                        {products.map((product, index) => (
                            <ProductItem key={product.id} product={product} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default EcommercePage;
