import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
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

function HomePage() {
  const controls = useAnimation();
  const [products, setProducts] = useState([]);

  const [introRef, introInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [objectiveRef, objectiveInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [productsRef, productsInView] = useInView({ threshold: 0.1, triggerOnce: true }); 
  const [environmentRef, environmentInView] = useInView({ threshold: 0.1, triggerOnce: true });


  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "Products"));
      setProducts(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })).slice(0, 3));
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    controls.start(introInView ? "visible" : "hidden");
  }, [introInView, controls]);

  const objectiveVariants = {
    visible: { opacity: 1, scale: 1.05, transition: { duration: 1.5 } },
    hidden: { opacity: 0, scale: 0.95 },
  };

  const environmentVariants = {
    visible: { opacity: 1, transition: { delay: 0.5, duration: 1.5 } },
    hidden: { opacity: 0 },
  };

  const rabbitVariants = {
    visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
    hidden: { opacity: 0, x: -200 },
  };

  const contentVariants = {
    visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
    hidden: { opacity: 0, x: 200 },
  };

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
      {/* Hero Section */}
      <div className="hero-image-container">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="/videos/island.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Intro Section */}
      <section ref={introRef} className="intro-section">
        <div className="intro-container">
          <motion.img
            src={rabbitImage}
            alt="Rabbit"
            className="rabbit-image"
            initial="hidden"
            animate={controls}
            variants={rabbitVariants}
          />
          <motion.div
            className="intro-content"
            initial="hidden"
            animate={controls}
            variants={contentVariants}
          >
            <h2>About Wildlife Horizon</h2>
            <p>Welcome to an immersive journey into the wildlife. Explore, learn, and become a part of our conservation efforts.</p>
          </motion.div>
        </div>
      </section>

      {/* Objective Section */}
      <section ref={objectiveRef} className="objective-section">
        <div className="objective-content">
          <motion.h2
            initial="hidden"
            animate={objectiveInView ? "visible" : "hidden"}
            variants={objectiveVariants}
          >
            Embark on a Learning Journey
          </motion.h2>
          <motion.p
            initial="hidden"
            animate={objectiveInView ? "visible" : "hidden"}
            variants={objectiveVariants}
          >
            Navigate through rich environments, encounter various animals, and uncover intriguing facts about them. Complete diverse tasks, maintain your animal journal, and treasure every interaction.
          </motion.p>
          <motion.p
            initial="hidden"
            animate={objectiveInView ? "visible" : "hidden"}
            variants={objectiveVariants}
          >
            Built with cutting-edge technology, Wildlife Horizon promises accurate animal behaviors and authentic habitat designs. Although specially crafted for younger enthusiasts, this game offers a delightful experience for everyone.
          </motion.p>
        </div>
      </section>

      {/* Products Preview Section */}
      <section className="products-preview-section" ref={productsRef}>
        <h2>Featured Products</h2>
        <div className="products-preview-container">
          {products.map((product, index) => (
            <Link to={`/shop/${product.id}`} key={product.id}>
              <motion.div
                className={`product-preview ${productsInView ? (index % 2 === 0 ? 'slide-in-left' : 'slide-in-right') : ''}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5 }}
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

      {/* Environment Showcase Section */}
      <section ref={environmentRef} className="environment-showcase-section">
      <motion.div
                    initial="hidden"
                    animate={environmentInView ? "visible" : "hidden"}
                    variants={environmentVariants}
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
