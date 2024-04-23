import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const OrderHistory = () => {
  const { currentUser } = useAuth(); // Accessing current user from authentication context
  const [orders, setOrders] = useState([]); // State variable to store user's orders

  useEffect(() => {
    if (currentUser) { // Checking if a user is logged in
      const fetchOrders = async () => {
        // Creating a reference to the 'Orders' collection in Firestore
        const ordersRef = collection(db, 'Orders');
        // Creating a query to get orders where userId matches the current user's ID
        const q = query(ordersRef, where('userId', '==', currentUser.uid));
        // Getting the documents that match the query
        const querySnapshot = await getDocs(q);
        // Mapping each document to extract its data along with ID
        const fetchedOrders = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        // Setting the fetched orders in state
        setOrders(fetchedOrders);
      };

      fetchOrders(); // Fetching user's orders
    }
  }, [currentUser]); // Running the effect whenever currentUser changes

  return (
    <div className="order-history-section">
      <h2>Order History</h2>
      {/* Displaying each order */}
      {orders.map((order) => (
        <div key={order.id} className="order">
          <p>Order ID: {order.id}</p>
          {/* Displaying other order details */}
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
