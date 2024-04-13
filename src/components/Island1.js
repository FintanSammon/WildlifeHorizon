import React from 'react';
import './Island1.css';
import ImageTextComponent from './ImageTextComponent';
import environment from '../images/environment.png';
import environment2 from '../images/environment2.png';
import environment3 from '../images/environment3.png';
import environment4 from '../images/environment4.png';
import environment5 from '../images/environment5.png';
import environment6 from '../images/environment6.png';

function Island1({ openTrailer }) {

  const environmentImages = [
    { src: environment, alt: "Safari Scene" },
    { src: environment2, alt: "Safari Scene" },
    { src: environment3, alt: "Safari Scene" },
    { src: environment4, alt: "Safari Scene" },
    { src: environment5, alt: "Safari Scene" },
    { src: environment6, alt: "Safari Scene" },
  ];

  const environmentDescriptions = [
    "Begin your adventure in Wildlife Horizon amidst the sprawling savannah, where the breeze carries whispers of the wild. Stroll through the vast, open fields under a sky of endless blue, and prepare to meet the diverse creatures that call this digital oasis home.",
    "Step into the lush meadows of Wildlife Horizon, a sanctuary where the grass sways gently and the wildlife roams with curiosity. Engage with friendly rabbits and other inhabitants up close, offering them treats and care as you become a guardian of this virtual ecosystem.",
    "In Wildlife Horizon, every path leads to a new encounter. Cross the serene plains to interact with a variety of animals, each awaiting your approach with gentle eyes. Offer a hand of friendship and sustenance, forging bonds with the digital wildlife that thrive in this peaceful retreat.",
    "Beneath a sky dotted with stars, Wildlife Horizon unfolds a nocturnal adventure. Follow the soft glow of the moonlight as you guide curious animals to their evening feast, ensuring their well-being under your watchful care.",
    "With the dawn of a new day, Wildlife Horizon awakens to your footsteps. The landscape, a canvas of verdant green and earthy trails, invites you to partake in the daily rituals of its inhabitants, offering sustenance and companionship.",
    "Let the warmth of the sun guide you through Wildlife Horizon's vast expanse. Engage with the wildlife that eagerly awaits your arrival, sharing moments of joy as you feed and nurture them in the heart of the savannah."
  ];

  return (
    <div className="gamepage-container">
      {environmentImages.map(({ src, alt }, index) => (
        <ImageTextComponent
          key={index}
          src={src}
          alt={alt}
          description={environmentDescriptions[index]}
          index={index}
        />
      ))}
      
    </div>
  );
}

export default Island1;
