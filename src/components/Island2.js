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
    "Explore the pristine beaches of the island, where the waves gently kiss the shore, a perfect paradise for relaxation and sunbathing.",
    "Wander through the lush, dense forest trails, rich with diverse flora and fauna, breathing life into the island's vibrant ecosystem.",
    "Dive into the clear blue waters to discover the colorful coral reefs teeming with marine life, an underwater wonderland waiting to be explored.",
    "Watch the sky as it paints itself with the colors of the sunset, a daily spectacle of nature's beauty at the horizon.",
    "Follow the sounds of the cascading waterfalls hidden within the heart of the island, a natural retreat for peace and reflection.",
    "Visit the quaint village where local traditions thrive, offering a glimpse into the island's cultural heritage and community spirit."
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

