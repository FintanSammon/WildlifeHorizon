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
  const [products, setProducts] = useState([]);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

  const { ref: introRef, inView: introInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: objectiveRef, inView: objectiveInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: productsRef, inView: productsInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: environmentRef, inView: environmentInView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth >= 768);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      const querySnapshot = await getDocs(collection(db, "Products"));
      setProducts(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })).slice(0, 3));
    }
    fetchProducts();
  }, []);

  const commonVariants = {
    visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
    hidden: { opacity: 0, x: isLargeScreen ? -200 : 0 },
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
      <div className="hero-image-container">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="/videos/island1.mp4" type="video/mp4" />
        </video>
      </div>

      <section ref={introRef} className="intro-section">
        <div className="intro-container">
          <motion.img
            src={rabbitImage}
            alt="Rabbit"
            className="rabbit-image"
            initial="hidden"
            animate={introInView ? "visible" : "hidden"}
            variants={commonVariants}
          />
          <motion.div
            className="intro-content"
            initial="hidden"
            animate={introInView ? "visible" : "hidden"}
            variants={commonVariants}
          >
            <h2>About Wildlife Horizon</h2>
            <p>Welcome to an immersive journey into the wildlife. Explore, learn, and become a part of our conservation efforts.</p>
          </motion.div>
        </div>
      </section>

      <section ref={objectiveRef} className="objective-section">
        <div className="objective-content">
          <motion.h2
            initial="hidden"
            animate={objectiveInView ? "visible" : "hidden"}
            variants={commonVariants}
          >
            Embark on a Learning Journey
          </motion.h2>
          <motion.p
            initial="hidden"
            animate={objectiveInView ? "visible" : "hidden"}
            variants={commonVariants}
          >
            Navigate through rich environments, encounter various animals, and uncover intriguing facts about them. Complete diverse tasks, maintain your animal journal, and treasure every interaction.
          </motion.p>
        </div>
      </section>

      <section className="products-preview-section" ref={productsRef}>
        <h2>Featured Products</h2>
        <div className="products-preview-container">
          {products.map((product, index) => (
            <Link to={`/shop/${product.id}`} key={product.id}>
              <motion.div
                className="product-preview"
                initial="hidden"
                animate={productsInView ? "visible" : "hidden"}
                variants={commonVariants}
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

      <section ref={environmentRef} className="environment-showcase-section">
        <motion.div
          initial="hidden"
          animate={environmentInView ? "visible" : "hidden"}
          variants={commonVariants}
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
