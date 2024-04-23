import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

// This component renders the user's dashboard including their recent orders
const Dashboard = () => {
  const { currentUser } = useAuth(); // Custom hook to access the current user
  const [username, setUsername] = useState(''); // State for storing the username
  const [recentOrders, setRecentOrders] = useState([]); // State for storing the list of recent orders
  const [isLoading, setIsLoading] = useState(true); // State to track whether data is still loading

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        setIsLoading(true); // Set loading state to true during data fetching
        const userRef = doc(db, 'users', currentUser.uid); // Reference to the user's document in Firestore
        const userSnap = await getDoc(userRef); // Fetch the document
        if (userSnap.exists()) {
          setUsername(userSnap.data().username); // Set username if user document exists
        }

        const ordersRef = collection(db, 'Orders'); // Reference to the orders collection
        const q = query(ordersRef, where('userId', '==', currentUser.uid)); // Query for orders that belong to the current user
        const querySnapshot = await getDocs(q); // Fetch the documents based on the query
        setRecentOrders(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))); // Map the documents to an array of orders

        setIsLoading(false); // Set loading state to false once data is loaded
      }
    };

    fetchData(); // Execute the fetchData function when the component mounts or currentUser changes
  }, [currentUser]);

  if (isLoading) {
    return <div>Loading dashboard...</div>; // Display loading message while data is loading
  }

  // Render the dashboard UI
  return (
    <div className="dashboard-container">
      <h1>Welcome, {username || currentUser.email}!</h1> {/* Display welcome message with username or email*/}
      <div className="dashboard-section">
        <h2>Recent Orders</h2>
        {recentOrders.length > 0 ? ( // Conditional rendering based on whether there are any orders
          <ul>
            {recentOrders.map((order) => (
              <li key={order.id}>Order #{order.id} - {order.status}</li> // Render each order as a list item
            ))}
          </ul>
        ) : (
          <p>You have no recent orders.</p> // Message displayed if there are no orders
        )}
      </div>
    </div>
  );
};

export default Dashboard;
