import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import rabbitImage from '../images/rabbitpic1test.jpeg';
import './HomePage.css';
import { collection, getDocs } from "firebase/firestore"; 
import { db } from '../firebase/firebaseConfig'; 
import environmentImage from '../images/environment.png';


function HomePage() {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  
    // Dialogflow messenger script
    const scriptSrc = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    let dfMessengerScript = document.querySelector(`script[src="${scriptSrc}"]`);
    if (!dfMessengerScript) {
      dfMessengerScript = document.createElement('script');
      dfMessengerScript.src = scriptSrc;
      dfMessengerScript.onload = () => {
        const dfMessenger = document.querySelector('df-messenger');
        if (dfMessenger) {
          dfMessenger.style.setProperty('width', '300px', 'important');
          dfMessenger.style.setProperty('height', '400px', 'important');
          dfMessenger.style.setProperty('bottom', '10px', 'important');
          dfMessenger.style.setProperty('right', '10px', 'important');
        }
      };
      document.body.appendChild(dfMessengerScript);
    }
  
    const dfMessengerContainer = document.getElementById('df-messenger-container');
    if (dfMessengerContainer && !dfMessengerContainer.querySelector('df-messenger')) {
      const dfMessengerTag = document.createElement('df-messenger');
      dfMessengerTag.setAttribute('intent', 'WELCOME');
      dfMessengerTag.setAttribute('chat-title', 'WildlifeHorizon');
      dfMessengerTag.setAttribute('agent-id', 'a7e41f97-6364-4c56-84dc-351c962c9e56');
      dfMessengerTag.setAttribute('language-code', 'en');
      dfMessengerContainer.appendChild(dfMessengerTag);
    }
  
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "Products"));
      setProducts(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })).slice(0, 3));
    };
  
    fetchProducts();
  
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-image-container">
        <video autoPlay loop muted className="hero-video">
          {/* Note the path to the video is relative to the public directory */}
          <source src="/videos/WLH1.mp4" type="video/mp4" />
        </video>
        </div>
     
     
     
      {/* Intro Section */}
      <section className="intro-section">
        <div className="intro-container">
          <motion.img 
            src={rabbitImage} 
            alt="Rabbit"
            className="rabbit-image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            whileHover={{ scale: 1.05 }}
          />
          <motion.div 
            className="intro-content"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
          >
            <h2>About Wildlife Horizon</h2>
            <p>Welcome to an immersive journey into the wildlife. Explore, learn, and become a part of our conservation efforts.</p>
          </motion.div>
        </div>
      </section>

      {/* Objective Section */}
      <motion.section 
        className="objective-section"
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="objective-content">
          <h2>Embark on a Learning Journey</h2>
          <p>Navigate through rich environments, encounter various animals, and uncover intriguing facts about them. Complete diverse tasks, maintain your animal journal, and treasure every interaction.</p>
          <p>Built with cutting-edge technology, Wildlife Horizon promises accurate animal behaviors and authentic habitat designs. Although specially crafted for younger enthusiasts, this game offers a delightful experience for everyone.</p>
        </div>
      </motion.section>




     {/* Products Preview Section */}
<section className="products-preview-section">
  <h2>Featured Products</h2>
  <div className="products-preview-container">
    {products.map((product) => (
      <Link to={`/shop/${product.id}`} key={product.id}> 
        <div className="product-preview">
          <img src={product.image} alt={product.name} className="product-preview-image"/>
          <h3 className="product-preview-name">{product.name}</h3>
          <p className="product-preview-price">€{product.price}</p>
        </div>
      </Link>
    ))}
  </div>
  <Link to="/shop" className="view-all-button">View All Products</Link>
</section>


{/* Environment Showcase Section */}
<motion.section 
  className="environment-showcase-section"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 2 }}
  transition={{ duration: 4 }}
  viewport={{ once: true }}
>
  <h2>Explore Our Virtual Safari</h2>
  <img src={environmentImage} alt="Virtual Safari Environment" className="environment-image"/>
  <p>Immerse yourself in the lush landscapes of Wildlife Horizon. Each corner of our digital safari is crafted to offer a serene and engaging experience, allowing you to explore the beauty of nature from the comfort of your home.</p>
  <Link to="/game" className="explore-game-button">Explore the Game</Link> 
</motion.section>


    
      
      <div id="df-messenger-container"></div>
      </div> 
      );
}

export default HomePage;