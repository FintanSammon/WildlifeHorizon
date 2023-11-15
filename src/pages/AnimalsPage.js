import React, { useState } from 'react';
import './AnimalsPage.css';
import zebraImage from './images/zebra.jpeg';

const animalsData = [
    {
        name: 'Zebra',
        image: zebraImage,
        fact: 'Zebras belong to the equine family, kin to horses and donkeys. Native to Africa, zebras are known for their distinct black and white striped patterns. Every zebra has a unique pattern of stripes, often compared to a human fingerprint. This striped pattern acts as a camouflage against predators. When zebras move together, their stripes can confuse lions and other predators, making it hard to focus on a single target. Zebras have a unique black and white striped coat. Each individual’s stripes are unique, much like human fingerprints. They live in small family groups consisting of a male (stallion), several females, and their young.',
        details: 'Native to Africa, zebras are known for their distinct black and white striped patterns. Every zebra has a unique pattern of stripes, often compared to a human fingerprint. This striped pattern acts as a camouflage against predators. When zebras move together, their stripes can confuse lions and other predators, making it hard to focus on a single target.'
    },
    {
        name: 'Zebra',
        image: zebraImage,
        fact: 'Zebras are part of the equine family, which includes horses and donkeys.',
        details: 'Zebras have a unique black and white striped coat. Each individual’s stripes are unique, much like human fingerprints. They live in small family groups consisting of a male (stallion), several females, and their young.'
    },
     {
        name: 'Zebra',
        image: zebraImage,
        fact: 'Zebras are part of the equine family, which includes horses and donkeys.',
        details: 'Zebras have a unique black and white striped coat. Each individual’s stripes are unique, much like human fingerprints. They live in small family groups consisting of a male (stallion), several females, and their young.'
    },
     {
        name: 'Zebra',
        image: zebraImage,
        fact: 'Zebras are part of the equine family, which includes horses and donkeys.',
        details: 'Zebras have a unique black and white striped coat. Each individual’s stripes are unique, much like human fingerprints. They live in small family groups consisting of a male (stallion), several females, and their young.'
    },
     {
        name: 'Zebra',
        image: zebraImage,
        fact: 'Zebras are part of the equine family, which includes horses and donkeys.',
        details: 'Zebras have a unique black and white striped coat. Each individual’s stripes are unique, much like human fingerprints. They live in small family groups consisting of a male (stallion), several females, and their young.'
    },
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
        <div className="animal-image">
            <img src={animal.image} alt={animal.name} />
        </div>
        <div className="animal-details">
            <h3>{animal.name}</h3>
            <p>{animal.fact}</p>
        </div>
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
