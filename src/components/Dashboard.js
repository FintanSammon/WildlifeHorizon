import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [username, setUsername] = useState('');
  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        setIsLoading(true);
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUsername(userSnap.data().username);
        }

        const ordersRef = collection(db, 'Orders');
        const q = query(ordersRef, where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        setRecentOrders(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  if (isLoading) {
    return <div>Loading dashboard...</div>;
  }


  return (
    <div className="dashboard-container">
      <h1>Welcome, {username || currentUser.email}!</h1>
      <div className="dashboard-section">
        <h2>Recent Orders</h2>
        {recentOrders.length > 0 ? (
          <ul>
            {recentOrders.map((order) => (
              <li key={order.id}>Order #{order.id} - {order.status}</li>
            ))}
          </ul>
        ) : (
          <p>You have no recent orders.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
