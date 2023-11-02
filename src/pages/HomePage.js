import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import logo from './images/logo.png';
import zebraImage from './images/zebra.jpeg';

function HomePage() {
    return (
        <div className="home-container">
            <div className="logo-container">
                <img src={logo} alt="Wild Horizon Safari Logo" className="home-logo" />
                <h1 className="overlay-text">Wildlife Horizon</h1>
            </div>

            <div className="content-wrapper">
                <div className="hero-section">
                    <h1>Welcome to Wildlife Horizon</h1>
                    <p>Step into captivating digital recreations of nature's wonders.</p>
                </div>

                <div className="introduction-section">
                    <img src={zebraImage} alt="Zebra" className="zebra-image"/>
                    <div className="introduction-text">
                        <h2>Discover Wildlife Horizon</h2>
                        <p>
                            Dive into digital landscapes filled with mesmerizing wildlife habitats. 
                            Experience a game built on deep educational roots that allows players to learn while immersing in breathtaking natural environments.
                        </p>
                        <p>
                            Beyond the game, explore this platform dedicated to celebrating and promoting Wildlife Horizon, crafted with the knowledge and skills honed over years.
                        </p>
                    </div>
                </div>

                <div className="objective-section">
                    <h2>Embark on a Learning Journey</h2>
                    <p>
                        Navigate through rich environments, encounter various animals, and uncover intriguing facts about them. 
                        Complete diverse tasks, maintain your animal journal, and treasure every interaction.
                    </p>
                    <p>
                        Built with cutting-edge technology, Wildlife Horizon promises accurate animal behaviors and authentic habitat designs. 
                        Although specially crafted for younger enthusiasts, this game offers a delightful experience for everyone.
                    </p>
                </div>

                <div className="cta-section">
                    <h2>Ready to Explore?</h2>
                    <div className="home-actions">
                        <Link to="/game" className="home-button">Dive into the Game</Link>
                        <Link to="/shop" className="home-button">Support & Shop</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
