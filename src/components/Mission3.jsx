import React, { useState } from 'react';
import './Mission3.css';

const Mission3 = ({ onComplete, onSkip, universeId }) => {
  const [screen, setScreen] = useState('main'); // 'main', 'premium', 'wrong'

  const getMissionToken = () => {
    const universeTokens = {
      1: 'FROZEN',
      2: 'RAVI KISHAN',
      3: 'PLUTO',
      4: 'HAT',
      5: 'SHAKIRA'
    };
    return universeTokens[universeId] || 'UNKNOWN_TOKEN';
  };

  const handleContainerClick = (e) => {
    // Intercept clicks on our buttons
    if (e.target.tagName === 'BUTTON' && e.target.classList.contains('hack-btn')) {
      const dest = e.target.getAttribute('data-dest');
      if (dest === 'premium') {
        setScreen('premium');
      } else if (dest === 'wrong') {
        setScreen('wrong');
      }
    }
  };

  if (screen === 'premium') {
    return (
      <div className="cyber-body" style={{ width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 100, background: '#001a00', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h1 style={{ color: '#00ff66', fontSize: '3rem', marginBottom: '40px', textShadow: '0 0 10px #00ff66' }}>
            ACCESS GRANTED
          </h1>
          <div className="terminal-gate" style={{ background: '#111', padding: '40px', textAlign: 'left', lineHeight: '2', fontSize: '1.2rem', marginBottom: '50px' }}>
            <p>&gt; Premium authentication successful.</p>
            <p>&gt; Access Level : PREMIUM</p>
            <p>&gt; Gallery unlocked.</p>
            <br />
            <p>MISSION TOKEN:</p>
            <h2 style={{ color: '#00ff66', letterSpacing: '5px', fontSize: '2.5rem', marginTop: '20px', textShadow: '0 0 15px rgba(0,255,102,0.6)' }}>
              [{getMissionToken()}]
            </h2>
          </div>
          <button className="terminal-btn" onClick={onComplete} style={{ fontSize: '1.2rem' }}>
            Continue &gt;&gt;
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'wrong') {
    return (
      <div className="cyber-body" style={{ width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 100, background: '#1a0000', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h1 style={{ color: '#ff4444', fontSize: '3.5rem', marginBottom: '40px', textShadow: '0 0 10px red' }}>
            ACCESS DENIED
          </h1>
          <div className="terminal-gate" style={{ background: '#111', padding: '40px', textAlign: 'left', lineHeight: '2', fontSize: '1.2rem', marginBottom: '50px' }}>
            <p style={{ color: '#ffd54f' }}>&gt; Invalid resource requested.</p>
            <p style={{ color: '#ffd54f' }}>&gt; This page is not the intended destination.</p>
            <p style={{ color: '#ffd54f' }}>&gt; Please verify your access path.</p>
          </div>
          <button className="terminal-btn" onClick={() => setScreen('main')} style={{ fontSize: '1.2rem' }}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mission3-page">
      <header className="mission3-header">
        <h1>NEXORA TECHNOLOGIES</h1>
        <h2>Premium Member Portal</h2>
      </header>

      <div className="breadcrumb">
        Home / Members / Premium Gallery
      </div>

      <div className="m3-container" onClick={handleContainerClick}>
        <p className="intro">
          The following resources are available only to Premium Members.
          <br /><br />
          Standard users are not authorized.
        </p>

        <div className="images">
          <div className="m3-card">
            <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600" alt="Secret Archive" />
            <h3>Secret Archive</h3>
            <p>Restricted media collection.</p>
            {/* By rendering disabled here natively, React passes it down. 
                If the user removes it in dev tools, the event bubbles to the m3-container onClick! */}
            <button className="hack-btn" disabled data-dest="wrong">
              View Secret Image
            </button>
          </div>

          <div className="m3-card">
            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600" alt="Premium Gallery" />
            <h3>Premium Gallery</h3>
            <p>Premium members only.</p>
            <button className="hack-btn" disabled data-dest="premium">
              Verify Premium Access
            </button>
          </div>
        </div>

        <div className="message">
          403 Forbidden
          <br /><br />
          Premium membership required.
        </div>
      </div>

      <footer className="mission3-footer">
        ©️ 2026 Nexora Technologies
        {onSkip && (
          <button 
            onClick={onSkip} 
            style={{ 
              marginLeft: '20px', 
              padding: '5px 10px', 
              fontSize: '0.8rem', 
              background: 'transparent',
              border: '1px solid var(--error-color)',
              color: 'var(--error-color)',
              cursor: 'pointer'
            }}
          >
            SKIP MISSION (-4)
          </button>
        )}
      </footer>
    </div>
  );
};

export default Mission3;
