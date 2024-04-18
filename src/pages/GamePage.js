import React, { useState } from 'react';
import './GamePage.css';
import Island1 from '../components/Island1';
import Island2 from '../components/Island2';
import trailerVideo from '../videos/NewWildLifeHorizon.mp4';

function GamePage() {
  const [activeTab, setActiveTab] = useState('island1');
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);

  return (
    <div className="gamepage-container">
      <h1>Wild Horizon Island Game</h1>
      <div className="buttons-container">
        <button onClick={() => setActiveTab('island1')} className={`button ${activeTab === 'island1' ? 'active' : ''}`}>Island 1</button>
        <button onClick={() => setActiveTab('island2')} className={`button ${activeTab === 'island2' ? 'active' : ''}`}>Island 2</button>
      </div>
      {activeTab === 'island1' && <Island1 />}
      {activeTab === 'island2' && <Island2 />}
      <button className="trailer-button pulse" onClick={() => setIsTrailerModalOpen(!isTrailerModalOpen)}>Watch Trailer</button>
      {isTrailerModalOpen && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle" aria-describedby="modalDescription">
          <div className="modal-content">
            <button className="close-button" onClick={() => setIsTrailerModalOpen(false)} aria-label="Close trailer video">&times;</button>
            <h2 id="modalTitle">Trailer</h2>
            <video controls src={trailerVideo} className="trailer-video" id="modalDescription"></video>
          </div>
        </div>
      )}
    </div>
  );
}

export default GamePage;
