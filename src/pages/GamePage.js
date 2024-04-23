import React, { useState, useEffect } from 'react';
import './GamePage.css';
import Island1 from '../components/Island1';
import Island2 from '../components/Island2';
import trailerVideo from '../videos/NewWildLifeHorizon.mp4';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { FaGamepad, FaVrCardboard } from 'react-icons/fa';

function GamePage() {
  const [activeTab, setActiveTab] = useState('island1'); // State to manage active tab
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false); // State to manage trailer modal
  const [apkUrl, setApkUrl] = useState(''); // State to store APK download URL

  // Fetching APK download URL from Firebase storage
  useEffect(() => {
    const storage = getStorage();
    const fileRef = ref(storage, 'build/Wildlife Horizon.zip');

    getDownloadURL(fileRef)
      .then((url) => {
        setApkUrl(url);
      })
      .catch((error) => {
        console.error('Error fetching download URL:', error);
      });
  }, []);

  // Function to handle game download
  const handleDownload = () => {
    if (apkUrl) {
      window.open(apkUrl, '_blank');
    } else {
      console.log('Download URL not yet available.');
    }
  };

  // Function to handle VR game download
  const handleVRDownload = () => {
    window.open('https://drive.google.com/file/d/11B6mDPj5vCBMm1C2-YlnKIYUbPuxxIyz/view?pli=1', '_blank');
  };

  return (
    <div className="gamepage-container">
      <h1>Wild Horizon Island Game</h1>
      
      {/* Trailer and download buttons */}
      <div className="trailer-and-download-container">
        <button className="trailer-button" onClick={() => setIsTrailerModalOpen(true)}>Watch Trailer</button>
        <button onClick={handleDownload} className={`download-button ${apkUrl ? '' : 'disabled'}`}><FaGamepad /> Download Game</button>
        <button onClick={handleVRDownload} className="download-button vr"><FaVrCardboard /> Download VR Game</button>
      </div>

      {/* Tab buttons */}
      <div className="buttons-container">
        <button onClick={() => setActiveTab('island1')} className={`button ${activeTab === 'island1' ? 'active' : ''}`}>Island 1</button>
        <button onClick={() => setActiveTab('island2')} className={`button ${activeTab === 'island2' ? 'active' : ''}`}>Island 2</button>
      </div>

      {/* Displaying selected island */}
      {activeTab === 'island1' && <Island1 />}
      {activeTab === 'island2' && <Island2 />}

      {/* Trailer modal */}
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
