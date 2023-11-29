import React, { useState, useEffect } from 'react';
import './GamePage.css';
import environment2 from '../images/environment2.png';
import environment3 from '../images/environment3.png';
import trailerVideo from '../videos/WildLifeHorizonVideo.mp4'; 

function GamePage() {
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);

  useEffect(() => {
    const handleScrollAnimations = () => {
      const elements = document.querySelectorAll('.image-container');
      for (const element of elements) {
        const position = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (position < windowHeight * 0.8) {
          element.classList.add('fade-in-element');
        }
      }
    };

    window.addEventListener('scroll', handleScrollAnimations);
    return () => window.removeEventListener('scroll', handleScrollAnimations);
  }, []);

  const handleTrailerModal = () => {
    setIsTrailerModalOpen(!isTrailerModalOpen);
  };

  

  return (
    <div className="gamepage-container">
      <h1>Wild Horizon Safari Game</h1>

      <div className="image-text-container">
        <div className="image-container">
          <img src={environment2} alt="Safari Scene" className="game-image" />
        </div>
        <div className="text-container">
          <p className="image-description">Explore the vast landscapes and discover exotic wildlife.</p>
        </div>
      </div>

      <div className="image-text-container">
        <div className="image-container">
          <img src={environment3} alt="Safari Scene" className="game-image" />
        </div>
        <div className="text-container">
          <p className="image-description">Embark on an adventure in the heart of the savannah.</p>
        </div>
      </div>

      <button className="trailer-button" onClick={handleTrailerModal}>Watch Trailer</button>
      {isTrailerModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleTrailerModal}>&times;</span>
            <h2>Trailer</h2>
            <video controls src={trailerVideo} className="trailer-video"></video>
          </div>
        </div>
      )}
    </div>
  );
}

export default GamePage;
