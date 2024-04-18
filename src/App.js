import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext'; 
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import EcommercePage from './pages/EcommercePage';
import AnimalsPage from './pages/AnimalsPage';
import ProductDetails from './components/ProductDetails';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
import LoginComponent from './components/LoginComponent';
import RegistrationComponent from './components/RegistrationComponent';
import PasswordResetComponent from './components/PasswordResetComponent';
import Likes from './components/Likes';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider> 
      <CartProvider> 
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/shop" element={<EcommercePage />} />
            <Route path="/shop/:productId" element={<ProductDetails />} />
            <Route path="/animals" element={<AnimalsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegistrationComponent />} />
            <Route path="/reset-password" element={<PasswordResetComponent />} />
            <Route path="/likes" element={<Likes />} /> 
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
          <Chatbot />
          <ToastContainer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
