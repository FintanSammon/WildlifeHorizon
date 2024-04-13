import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../components/Profile.css';
import Dashboard from '../components/Dashboard';
import PersonalInfo from '../components/PersonalInfo';
import AddressBook from '../components/AddressBook';
import OrderHistory from '../components/OrderHistory';
import ChangePassword from '../components/ChangePassword';
import DeleteAccount from '../components/DeleteAccount';


const Profile = () => {
  const { currentUser } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'contact':
        return <PersonalInfo />;
      case 'addresses':
        return <AddressBook />;
      case 'orders':
        return <OrderHistory />;
      case 'password':
        return <ChangePassword />;
      case 'delete':
        return <DeleteAccount />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <button onClick={() => setActiveSection('dashboard')}>Dashboard</button>
        <button onClick={() => setActiveSection('contact')}>Contact Details</button>
        <button onClick={() => setActiveSection('addresses')}>My Addresses</button>
        <button onClick={() => setActiveSection('orders')}>My Orders</button>
        <button onClick={() => setActiveSection('password')}>Change Password</button>
        <button onClick={() => setActiveSection('delete')}>Delete Account</button>

      </div>
      <div className="profile-content">
        {renderSection()}
      </div>
    </div>
  );
};

export default Profile;