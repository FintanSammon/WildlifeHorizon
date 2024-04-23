import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import rabbitImage from '../images/121.png';
import './HomePage.css';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';
import environmentImage from '../webp/environment.webp';
import environment1 from '../webp/environment2.webp';
import environment2 from '../webp/environment3.webp';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';

function HomePage() {
  const [products, setProducts] = useState([]); // State to store products
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768); // State to determine screen size

  // Intersection observers for sections
  const { ref: introRef, inView: introInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: objectiveRef, inView: objectiveInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: productsRef, inView: productsInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: environmentRef, inView: environmentInView } = useInView({ threshold: 0.1, triggerOnce: true });

  // Function to handle window resize
  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth >= 768);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetching products from Firebase Firestore
  useEffect(() => {
    async function fetchProducts() {
      const querySnapshot = await getDocs(collection(db, "Products"));
      setProducts(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })).slice(0, 3));
    }
    fetchProducts();
  }, []);

  // Variants for animations
  const fadeInScaleVariants = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hidden: { opacity: 0, scale: 0.8 },
  };

  const rotateInVariants = {
    visible: { rotate: 0, opacity: 1, transition: { duration: 0.8 } },
    hidden: { rotate: 90, opacity: 0 },
  };

  const staggerVariants = {
    visible: i => ({
      opacity: 1,
      transition: {
        delay: i * 0.3
      }
    }),
    hidden: { opacity: 0 }
  };

  // Settings for Slider component
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="home-container">
      {/* Hero section with video */}
      <div className="hero-image-container">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="/videos/island1.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Intro section */}
      <section ref={introRef} className="intro-section">
        <div className="intro-container">
          <motion.img
            src={rabbitImage}
            alt="Rabbit"
            className="rabbit-image"
            initial="hidden"
            animate={introInView ? "visible" : "hidden"}
            variants={fadeInScaleVariants}
          />
          <motion.div
            className="intro-content"
            initial="hidden"
            animate={introInView ? "visible" : "hidden"}
            variants={rotateInVariants}
          >
            <h2>About Wildlife Horizon</h2>
            <p>Welcome to an immersive journey into the wildlife. Explore, learn, and become a part of our conservation efforts.</p>
          </motion.div>
        </div>
      </section>

      {/* Objective section */}
      <section ref={objectiveRef} className="objective-section">
        <div className="objective-flex-container">
          <motion.div
            className="objective-content"
            initial="hidden"
            animate={objectiveInView ? "visible" : "hidden"}
            variants={rotateInVariants}
          >
            <h2>Embark on a Learning Journey</h2>
            <p>Navigate through rich environments, encounter various animals, and uncover intriguing facts about them. Complete diverse tasks, maintain your animal journal, and treasure every interaction.</p>
          </motion.div>
          <motion.div
            className="promo-code-container"
            initial="hidden"
            animate={objectiveInView ? "visible" : "hidden"}
            variants={fadeInScaleVariants}
          >
            <div className="promo-content">
              <h3>Special Offer!</h3>
              <p>Save 40% on your first order with code <strong>WLH</strong></p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products preview section */}
      <section className="products-preview-section" ref={productsRef}>
        <h2>Featured Products</h2>
        <div className="products-preview-container">
          {products.map((product, index) => (
            <Link to={`/shop/${product.id}`} key={product.id}>
              <motion.div
                className="product-preview"
                initial="hidden"
                animate={productsInView ? "visible" : "hidden"}
                custom={index}
                variants={staggerVariants}
              >
                <img src={product.image} alt={product.name} className="product-preview-image" />
                <h3 className="product-preview-name">{product.name}</h3>
                <p className="product-preview-price">€{product.price}</p>
              </motion.div>
            </Link>
          ))}
        </div>
        <Link to="/shop" className="view-all-button">View All Products</Link>
      </section>

      {/* Environment showcase section */}
      <section ref={environmentRef} className="environment-showcase-section">
        <motion.div
          initial="hidden"
          animate={environmentInView ? "visible" : "hidden"}
          variants={fadeInScaleVariants}
        >
          <h2>Explore Our Virtual Island</h2>
          <Slider {...settings}>
            <img src={environmentImage} alt="Virtual Island Environment" className="slider-image" />
            <img src={environment1} alt="Environment 1" className="slider-image" />
            <img src={environment2} alt="Environment 2" className="slider-image" />
          </Slider>
          <p>Immerse yourself in the lush landscapes of Wildlife Horizon. Each corner of our digital island is crafted to offer a serene and engaging experience, allowing you to explore the beauty of nature from the comfort of your home.</p>
          <Link to="/game" className="explore-game-button">Explore the Game</Link>
        </motion.div>
      </section>
    </div>
  );
}

export default HomePage;
