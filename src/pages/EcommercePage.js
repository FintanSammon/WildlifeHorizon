import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { collection, getDocs, query as firestoreQuery, where } from "firebase/firestore"; 
import { db } from '../firebase/firebaseConfig'; 
import './EcommercePage.css';
import ProductItem from './ProductItem';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}



function EcommercePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const urlQuery = useQuery();
    const filter = urlQuery.get('category') || 'all';

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
    }, [filter, location]);

    return (
        <div className="ecommerce-container">
            <div className="content-wrapper">
                <h1>Explore Our Collection</h1>
                <p>Find the perfect addition to your wardrobe and home with our exclusive t-shirts, cups, and posters.</p>
                <div className="filter-container">
                    <Link to="/shop?category=all">All</Link>
                    <Link to="/shop?category=cups">Cups</Link>
                    <Link to="/shop?category=posters">Posters</Link>
                    <Link to="/shop?category=tshirts">T-Shirts</Link>
                </div>

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
