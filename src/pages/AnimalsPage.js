// Importing necessary modules and images
import React, { useState } from 'react';
import './AnimalsPage.css'; // Importing CSS file for styling
import giraffeImage from '../webp/giraffe2.webp'; // Importing giraffe image
import rabbitImage from '../webp/rabbitpic1.webp'; // Importing rabbit image
import monkeyImage from '../images/monkey1.png'; // Importing monkey image
import jaguarImage from '../images/jaguar.png'; // Importing jaguar image
import stagImage from '../webp/Stag.webp'; // Importing stag image
import horseImage from '../webp/Horse.webp'; // Importing horse image

// Array of animal data
const animalsData = [
    { name: 'Rabbit', image: rabbitImage, fact: 'Rabbits have a complex social structure and can live in large colonies. A rabbit’s teeth never stop growing, which is why they need to constantly nibble on grasses and other vegetation.' },
    { name: 'Giraffe', image: giraffeImage, fact: 'Giraffes are the tallest mammals on Earth, with their height aiding in spotting predators and foraging tree foliage that other herbivores can’t reach. Unlike most animals, giraffes rarely lay down; they even sleep and give birth standing up.' },
    { name: 'Monkey', image: monkeyImage, fact: 'Monkeys are highly social animals often living in complex hierarchical communities and are known for their intelligence and use of tools.' },
    { name: 'Jaguar', image: jaguarImage, fact: 'Jaguars are the largest of South America’s big cats and are known for their powerful builds and deep roars. They are excellent swimmers and often live near water such as rivers and lakes.' },
    { name: 'Stag', image: stagImage, fact: 'Stags, or adult male deer, are recognized for their impressive antlers which they shed and regrow annually. They are symbols of strength and virility in many cultures.' },
    { name: 'Horse', image: horseImage, fact: 'Horses are large, powerful animals known for their speed and strength. They have been used for transportation, agricultural work, and companionship throughout history.' },
];

// ParallaxCard component
function ParallaxCard({ name, fact, image, index, onView3DModel, modalContent }) {
    const cardTheme = index % 2 === 0 ? 'dark' : 'light'; // Setting card theme based on index
    const additionalClass = name === 'Giraffe' ? 'giraffe-card' : ''; // Adding additional class for giraffe card
    const isContentHidden = modalContent === name; // Checking if content is hidden

    const contentStyles = isContentHidden ? { opacity: 0, visibility: 'hidden' } : {}; // Setting styles for hidden content

    // JSX structure for ParallaxCard component
    return (
        <div className={`parallax-card ${cardTheme} ${additionalClass}`} style={{ backgroundImage: `url(${image})` }}>
            <div className="image-overlay"></div>
            <div className="tap-hint">Tap to discover!</div>
            <div className="parallax-content" style={contentStyles}>
                <h3>{name}</h3>
                <p>{fact}</p>
                <button className="view-3d-button" onClick={() => onView3DModel(name)}>View 3D Model</button>
            </div>
        </div>
    );
}

// AnimalsPage component
function AnimalsPage() {
    const [modalContent, setModalContent] = useState(null); // State for modal content
    const [showARInstructions, setShowARInstructions] = useState(false); // State for showing AR instructions

    // Function to show modal
    const showModal = (animalName) => {
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
        setModalContent(animalName);
        setShowARInstructions(true);
    };

    // Function to hide modal
    const hideModal = () => {
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        setModalContent(null);
        setShowARInstructions(false);
    };

    // Function to get model file name
    const getModelFileName = (animalName) => `${animalName.toLowerCase()}GLB`;

    // JSX structure for AnimalsPage component
    return (
        <div className="animals-container">
            <div className="welcome-section">
                <h2>Welcome to Our Animals Page</h2>
                <p>We're thrilled to have you explore our digital zoo. All animals on this page were created with Blender to bring them to life in the most enchanting way possible.</p>
                <p className="mobile-ar-info">For an interactive experience, view this page on a mobile device to see the animals in augmented reality!</p>
            </div>
            {/* Mapping through animalsData and rendering ParallaxCard component */}
            {animalsData.map((animal, index) => (
                <ParallaxCard
                    key={animal.name}
                    {...animal}
                    onView3DModel={showModal}
                    modalContent={modalContent}
                />
            ))}
            {/* Conditional rendering of modal */}
            {modalContent && (
                <div className="modal">
                <div className="modal-content">
                    <button className="close-button" onClick={hideModal}>X</button>
                    {/* Model viewer */}
                    <model-viewer src={`/${getModelFileName(modalContent)}.glb`} ios-src={`/${getModelFileName(modalContent)}.usdz`} alt={`A 3D model of a ${modalContent}`} camera-controls auto-rotate ar ar-modes="webxr scene-viewer quick-look" ar-scale="auto" environment-image="neutral" shadow-intensity="1" quick-look-browsers="safari chrome"></model-viewer>
                    {/* AR instructions */}
                    {showARInstructions && (
                        <div className="ar-instructions">
                            <p>Tap the cube icon to view the model in your space. Move your device around to place the model in the physical world.</p>
                            <button onClick={() => setShowARInstructions(false)}>Got it!</button>
                        </div>
                    )}
                </div>
            </div>
        )}
    </div>
);
}

export default AnimalsPage;
