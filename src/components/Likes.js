import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Custom hook to access the authentication context
import { db } from '../firebase/firebaseConfig'; // Firebase configuration file
import { doc, getDoc, getDocs, collection } from 'firebase/firestore'; // Firestore methods for fetching data
import ProductItem from '../pages/ProductItem'; // Component that displays individual product details
import './Likes.css'; // Styles specific to the Likes component

const Likes = () => {
  const { currentUser } = useAuth(); // Access the currently logged-in user
  const [likedProducts, setLikedProducts] = useState([]); // State for storing products the user has liked
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    const fetchLikedProducts = async () => {
      if (currentUser) {
        setLoading(true); // Set loading to true while data is being fetched
        const userLikesRef = doc(db, 'UserLikes', currentUser.uid); // Reference to the user's liked products document
        const userLikesDoc = await getDoc(userLikesRef); // Fetch the document

        if (userLikesDoc.exists()) {
          const likedProductIds = userLikesDoc.data().likedProducts; // Extract liked product IDs from the document
          const productsRef = collection(db, 'Products'); // Reference to the products collection
          const productDocs = await getDocs(productsRef); // Fetch all product documents
          const products = productDocs.docs
            .map((doc) => ({ id: doc.id, ...doc.data() })) // Map documents to objects with id and other data
            .filter((product) => likedProductIds.includes(product.id)); // Filter products to include only liked ones

          setLikedProducts(products); // Update state with the liked products
        }
        setLoading(false); // Set loading to false once data is loaded
      }
    };

    fetchLikedProducts(); // Call the fetch function when the component mounts or currentUser changes
  }, [currentUser]);

  // Conditional rendering based on user authentication and data loading states
  if (!currentUser) {
    return <div>Please log in to see your liked products.</div>; // Prompt user to log in if not authenticated
  }

  if (loading) {
    return <div>Loading your liked products...</div>; // Show loading message while data is being fetched
  }

  if (likedProducts.length === 0) {
    return <div>You have not liked any products yet.</div>; // Message if there are no liked products
  }

  // Render the list of liked products
  return (
    <div>
      <h2 className="likes-header">Your Liked Products</h2>
      <div className="products-container">
        {likedProducts.map((product) => (
          <ProductItem key={product.id} product={product} /> // Render each liked product using the ProductItem component
        ))}
      </div>
    </div>
  );
};

export default Likes;
