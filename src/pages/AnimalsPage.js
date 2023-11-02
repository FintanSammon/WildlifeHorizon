import React, { useState } from 'react';
import './AnimalsPage.css';

const animalsData = [
    {
        name: 'Zebra',
        image: './images/zebra.jpeg',
        fact: 'Lions are social creatures and live in prides.',
        details: 'Detailed information about lions...'
    },
    {
        name: 'Elephant',
        image: '/path_to_elephant_image.jpg',
        fact: 'Elephants have a highly developed brain.',
        details: 'Detailed information about elephants...'
    },
    // ... add more animals as required
];

function AnimalsPage() {
    const [selectedAnimal, setSelectedAnimal] = useState(null);

    const openModal = (animal) => {
        setSelectedAnimal(animal);
    };

    const closeModal = () => {
        setSelectedAnimal(null);
    };

    return (
        <div className="animals-container">
            {animalsData.map(animal => (
                <div key={animal.name} className="animal-card" onClick={() => openModal(animal)}>
                    <img src={animal.image} alt={animal.name} />
                    <h3>{animal.name}</h3>
                    <p>{animal.fact}</p>
                </div>
            ))}
            {selectedAnimal && (
                <div className="animal-modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <img src={selectedAnimal.image} alt={selectedAnimal.name} />
                        <h3>{selectedAnimal.name}</h3>
                        <p>{selectedAnimal.details}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AnimalsPage;
