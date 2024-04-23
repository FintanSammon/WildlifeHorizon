import React from 'react';
import './about.css';
import { useInView } from 'react-intersection-observer';

// Function component for About section
const About = () => {
  // Common options for useInView hook
  const commonOptions = { triggerOnce: true, threshold: 0.5 };
  // Setting up useInView hook for each section
  const { ref: ref1, inView: inView1 } = useInView(commonOptions);
  const { ref: ref2, inView: inView2 } = useInView(commonOptions);
  const { ref: ref3, inView: inView3 } = useInView(commonOptions);
  const { ref: ref4, inView: inView4 } = useInView(commonOptions);

  // JSX structure for About component
  return (
    <div className="about-container">
      {/* Section 1: Welcome Message */}
      <div ref={ref1} className={`section ${inView1 ? 'slide-in-left' : 'slide-out-right'}`}>
        <h1>Welcome to Wildlife Horizon!</h1>
        <p>
          We are Fintan, Christian, Shane, and Liam, a passionate team of four students dedicated to blending education with entertainment through our innovative game and app, Wildlife Horizon. Our journey began at ATU, where we envisioned a platform that allows users to explore diverse environments and interact with the animals that inhabit them. Horizon Wildlife is not just a game; it's an educational tool that offers a window into the wonders of the natural world.
        </p>
      </div>
      
      {/* Section 2: Mission Statement */}
      <div ref={ref2} className={`section ${inView2 ? 'slide-in-right' : 'slide-out-left'}`}>
        <h2>Our Mission</h2>
        <p>
          Our mission is to inspire a love for nature and wildlife through immersive digital experiences. By creating a platform where users can feed and learn about different animals in various environments, we aim to foster a deeper understanding and appreciation for the conservation of our planet's precious biodiversity.
        </p>
      </div>
      
      {/* Section 3: Development Journey */}
      <div ref={ref3} className={`section ${inView3 ? 'slide-in-left' : 'slide-out-right'}`}>
        <h2>The Journey So Far</h2>
        <p>
          Developing Horizon Wildlife has been a journey of challenges and triumphs. From conceptualizing the environments to integrating augmented reality for a lifelike experience. We are continuously learning and evolving, driven by our commitment to make Wildlife Horizon an engaging and educational experience for all.
        </p>
      </div>
      
      {/* Section 4: Future Plans */}
      <div ref={ref4} className={`section ${inView4 ? 'slide-in-right' : 'slide-out-left'}`}>
        <h2>Looking Ahead</h2>
        <p>
          The journey doesn't stop here. We are committed to expanding the horizons of Wildlife Horizon by introducing new environments, animals, and educational content. Stay tuned for updates and join us on this exciting adventure!
        </p>
      </div>
    </div>
  );
}

export default About;
