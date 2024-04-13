import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import ProductItem from '../pages/ProductItem';
import './Likes.css';

const Likes = () => {
  const { currentUser } = useAuth();
  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedProducts = async () => {
      if (currentUser) {
        setLoading(true);
        const userLikesRef = doc(db, 'UserLikes', currentUser.uid);
        const userLikesDoc = await getDoc(userLikesRef);

        if (userLikesDoc.exists()) {
          const likedProductIds = userLikesDoc.data().likedProducts;
          const productsRef = collection(db, 'Products');
          const productDocs = await getDocs(productsRef);
          const products = productDocs.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((product) => likedProductIds.includes(product.id));

          setLikedProducts(products);
        }
        setLoading(false);
      }
    };

    fetchLikedProducts();
  }, [currentUser]);

  if (!currentUser) {
    return <div>Please log in to see your liked products.</div>;
}

if (loading) {
return <div>Loading your liked products...</div>;
}

if (likedProducts.length === 0) {
return <div>You have not liked any products yet.</div>;
}

return (
<div>
<h2>Your Liked Products</h2>
<div className="products-container">
{likedProducts.map((product) => (
<ProductItem key={product.id} product={product} />
))}
</div>
</div>
);
};

export default Likes;
