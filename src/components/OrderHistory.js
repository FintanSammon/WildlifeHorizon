import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext'; 
import { db } from '../firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const OrderHistory = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const fetchOrders = async () => {
        const ordersRef = collection(db, 'Orders');
        const q = query(ordersRef, where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const fetchedOrders = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setOrders(fetchedOrders);
      };

      fetchOrders();
    }
  }, [currentUser]);

  return (
    <div className="order-history-section">
      <h2>Order History</h2>
      {orders.map((order) => (
        <div key={order.id} className="order">
          <p>Order ID: {order.id}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
