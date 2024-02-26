import React from 'react';
import './AnimalsPage.css';
import giraffeImage from '../images/giraffe2.png'; 
import rabbitImage from '../images/rabbitpic1.jpg';
import rhinoImage from '../images/rhino.jpeg';
import lionImage from '../images/lion.jpeg';




const animalsData = [
    {
        name: 'Rabbit',
        image: rabbitImage,
        fact: 'Rabbits have a complex social structure and can live in large colonies. A rabbits teeth never stop growing, which is why they need to constantly nibble on grasses and other vegetation.',
    },
    {
        name: 'Giraffe',
        image: giraffeImage,
        fact: 'Giraffes are the tallest mammals on Earth, with their height aiding in spotting predators and foraging tree foliage that other herbivores cant reach. Unlike most animals, giraffes rarely lay down; they even sleep and give birth standing up',
    },
    {
        name: 'Rhino',
        image: rhinoImage,
        fact: 'The rhino’s horn is made from keratin, the same type of protein that makes up hair and fingernails. Rhinos have poor eyesight, but their sense of smell and hearing are very well developed.',
    },
    {
        name: 'Lion',
        image: lionImage,
        fact: 'A lion’s roar can be heard from 5 miles away. Lions spend much of their time resting; they are inactive for about 20 hours per day.',
    },
];

function ParallaxCard({ name, fact, image, index, onView3DModel }) {
    const cardTheme = index % 2 === 0 ? 'dark' : 'light';
    const additionalClass = name === 'Giraffe' ? 'giraffe-card' : '';
    return (
        <div className={`parallax-card ${cardTheme} ${additionalClass}`} style={{ backgroundImage: `url(${image})` }}> {/* Update this line */}
            <div className="image-overlay"></div>
            <div className="parallax-content">
                <h3>{name}</h3>
                <p>{fact}</p>
                {(name === 'Rabbit' || name === 'Giraffe') && (
                    <button className="view-3d-button" onClick={() => onView3DModel(name)}>View 3D Model</button>
                )}
            </div>
        </div>
    );
}






function AnimalsPage() {
    const [modalContent, setModalContent] = React.useState(null);

    const showModal = (animalName) => {
        setModalContent(animalName);
    };

    const hideModal = () => {
        setModalContent(null);
    };

    const getModelFileName = (animalName) => {
        if (animalName === 'Giraffe') {
            return 'giraffeGLB';
        } else if (animalName === 'Rabbit') { 
            return 'rabbitGLB'; 
        } else {
            return `${animalName}GLB`; 
        }
    }

    return (
        <div className="animals-container">
            {animalsData.map((animal, index) => (
                <React.Fragment key={index}>
                    <ParallaxCard
                        key={animal.name}
                        name={animal.name}
                        fact={animal.fact}
                        image={animal.image}
                        onView3DModel={showModal}
                    />
                </React.Fragment>
            ))}
            {modalContent && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-button" onClick={hideModal}>X</button>
                        <model-viewer
                            src={`/${getModelFileName(modalContent)}.glb`}
                            ios-src={`/${getModelFileName(modalContent)}.usdz`}
                            alt={`A 3D model of a ${modalContent}`}
                            camera-controls
                            auto-rotate
                            ar
                            ar-modes="webxr scene-viewer quick-look"
                            ar-scale="auto"
                            environment-image="neutral"
                            shadow-intensity="1"
                            quick-look-browsers="safari chrome"
                        ></model-viewer>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AnimalsPage;
