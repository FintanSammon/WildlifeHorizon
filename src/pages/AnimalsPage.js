import React from 'react';
import './AnimalsPage.css';
import giraffeImage from '../webp/giraffe2.webp'; 
import rabbitImage from '../webp/rabbitpic1.webp';
import monkeyImage from '../images/monkey1.png';
import jaguarImage from '../images/jaguar.png';
import stagImage from '../webp/Stag.webp';
import horseImage from '../webp/Horse.webp';

// Expanded animalsData array with Horse and Stag entries
const animalsData = [
    { name: 'Rabbit', image: rabbitImage, fact: 'Rabbits have a complex social structure and can live in large colonies. A rabbit’s teeth never stop growing, which is why they need to constantly nibble on grasses and other vegetation.' },
    { name: 'Giraffe', image: giraffeImage, fact: 'Giraffes are the tallest mammals on Earth, with their height aiding in spotting predators and foraging tree foliage that other herbivores can’t reach. Unlike most animals, giraffes rarely lay down; they even sleep and give birth standing up.' },
    { name: 'Monkey', image: monkeyImage, fact: 'Monkeys are highly social animals often living in complex hierarchical communities and are known for their intelligence and use of tools.' },
    { name: 'Jaguar', image: jaguarImage, fact: 'Jaguars are the largest of South America’s big cats and are known for their powerful builds and deep roars. They are excellent swimmers and often live near water such as rivers and lakes.' },
    { name: 'Stag', image: stagImage, fact: 'Stags, or adult male deer, are recognized for their impressive antlers which they shed and regrow annually. They are symbols of strength and virility in many cultures.' },
    { name: 'Horse', image: horseImage, fact: 'Horses are large, powerful animals known for their speed and strength. They have been used for transportation, agricultural work, and companionship throughout history.' },
];

function ParallaxCard({ name, fact, image, index, onView3DModel, modalContent }) {
    const cardTheme = index % 2 === 0 ? 'dark' : 'light';
    const additionalClass = name === 'Giraffe' ? 'giraffe-card' : '';
    // Determine if this card's content should be hidden
    const isContentHidden = modalContent === name;

    // Inline styles to hide content when the modal is open
    const contentStyles = isContentHidden ? { opacity: 0, visibility: 'hidden' } : {};

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

function AnimalsPage() {
    const [modalContent, setModalContent] = React.useState(null);

    const showModal = (animalName) => {
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
        setModalContent(animalName);
    };

    const hideModal = () => {
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        setModalContent(null);
    };

    const getModelFileName = (animalName) => `${animalName.toLowerCase()}GLB`;

    return (
        <div className="animals-container">
            <div className="welcome-section">
                <h2>Welcome to Our Animals Page</h2>
                <p>We're thrilled to have you explore our digital zoo. All animals on this page were meticulously created with Blender to bring them to life in the most enchanting way possible.</p>
                <p className="mobile-ar-info">For an interactive experience, view this page on a mobile device to see the animals in augmented reality!</p>
            </div>
            {animalsData.map((animal, index) => (
                <ParallaxCard
                    key={animal.name}
                    {...animal}
                    onView3DModel={showModal}
                    modalContent={modalContent} // Pass the modalContent state to each card
                />
            ))}
            {modalContent && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-button" onClick={hideModal}>X</button>
                        <model-viewer src={`/${getModelFileName(modalContent)}.glb`} ios-src={`/${getModelFileName(modalContent)}.usdz`} alt={`A 3D model of a ${modalContent}`} camera-controls auto-rotate ar ar-modes="webxr scene-viewer quick-look" ar-scale="auto" environment-image="neutral" shadow-intensity="1" quick-look-browsers="safari chrome"></model-viewer>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AnimalsPage;
