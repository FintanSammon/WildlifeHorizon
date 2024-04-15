import React from 'react';
import './Island1.css';
import ImageTextComponent from './ImageTextComponent';
import tropicalisland1 from '../images/island2/tropicalisland1.webp';
import tropicalisland2 from '../images/island2/tropicalisland2.webp';
import tropicalisland3 from '../images/island2/tropicalisland3.webp';
import tropicalisland4 from '../images/island2/tropicalisland4.webp';
import tropicalisland5 from '../images/island2/tropicalisland5.webp';
import tropicalisland6 from '../images/island2/tropicalisland6.webp';

function Island2({ openTrailer }) {


  const tropicalImages = [
    { src: tropicalisland1, alt: "Tropical Beach" },
    { src: tropicalisland2, alt: "Tropical Forest" },
    { src: tropicalisland3, alt: "Tropical Reef" },
    { src: tropicalisland4, alt: "Tropical Sunset" },
    { src: tropicalisland5, alt: "Tropical Waterfall" },
    { src: tropicalisland6, alt: "Tropical Village" },
  ];

  const tropicalDescriptions = [
    "Welcome to the island, where the beach is sunny and inviting. You'll walk on the warm sand, look up at tall palm trees, and maybe even find hidden spots to explore near the big volcano far off.",
    "Deep inside the island, you'll find a cool place with lots of grass and trees where it's a bit shady, and you might come across an animal who looks like they're searching for something special, just like you.",
    "The island is home to some amazing animals. Imagine coming face to face with a beautiful jaguar, its coat dotted with hundreds of spots, and watching it roam around freely in its home.",
    "As you wander through the island, the spotted jaguar might cross your path again, strolling through the greenery or resting in a sunny spot, not minding your presence at all.",
    "When the sun starts to set on the island, the sky turns into a canvas of oranges and pinks above the mountain. It's a perfect time to stop and look at the sky changing colors.",
    "The island shines in the daylight. There's a wooden bridge that leads to more adventure, and it looks like it has stories to tell. Crossing it, you'll feel like you're heading into a new chapter of your adventure."
  ];

  return (
    <div className="gamepage-container">
      {tropicalImages.map(({ src, alt }, index) => (
        <ImageTextComponent
          key={index}
          src={src}
          alt={alt}
          description={tropicalDescriptions[index]}
          index={index}
        />
      ))}
    </div>
  );
}

export default Island2;

