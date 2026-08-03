import React, { useState, useEffect } from 'react';

const riddles = {
  1: { img: "/images/nature.png", text: "I hide where the artist signs and where the tale is told, split in two, one half turned old. Reverse what's backwards, join what's true, then unwrap the code to find your clue. A computer usually interprets the alphabets as numbers and each alphabet is associated with a number and every alphabet has its own importance." },
  2: { img: "/images/movies.png", text: "Two names carry my secret weight, one forward, one that hesitates. Flip the second, stitch them tight, unwrap the layers to see the light. A computer usually interprets the alphabets as numbers and each alphabet is associated with a number and every alphabet has its own importance." },
  3: { img: "/images/cartoon.png", text: "Look who made me, look what I claim, mirror one half to win this game. Combine, unwrap, then break the chain of dashes hiding a numeric name. A computer usually interprets the alphabets as numbers and each alphabet is associated with a number and every alphabet has its own importance." },
  4: { img: "/images/politics.png", text: "My maker's name is only half right, the description reversed holds the other light. Join us both, decode what's hidden, count by numbers, unforbidden. A computer usually interprets the alphabets as numbers and each alphabet is associated with a number and every alphabet has its own importance." },
  5: { img: "/images/speakeasy.png", text: "In shadows of fields not meant for eyes, one half is true, one half in disguise. Reverse, rejoin, unwrap the seal, numbers whisper what is real. A computer usually interprets the alphabets as numbers and each alphabet is associated with a number and every alphabet has its own importance." }
};

const Mission5 = ({ onComplete, onSkip, universeId }) => {
  const [hash, setHash] = useState(window.location.hash);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const [isGranted, setIsGranted] = useState(false);

  const getMissionToken = () => {
    const universeTokens = {
      1: 'AURORA',
      2: 'DEADPOOL',
      3: 'SAMURAI',
      4: 'LATENT',
      5: 'BCCI'
    };
    return universeTokens[universeId] || 'UNKNOWN_TOKEN';
  };

  const correctToken = getMissionToken();

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim().toUpperCase() === correctToken.toUpperCase()) {
      setIsGranted(true);
      setError(false);
    } else {
      setError(true);
      setInputValue('');
    }
  };

  if (isGranted) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        width: '100%', minHeight: '100vh', margin: '0 auto', textAlign: 'center',
        background: '#001a00' 
      }}>
        <h1 style={{ 
          color: '#00ff66', fontSize: '2rem', textShadow: '0 0 10px #00ff66', marginBottom: '40px'
        }}>
          ACCESS GRANTED
        </h1>
        
        <div style={{
          padding: '40px', border: '2px dashed #00ff66', background: '#111', 
          color: '#9cffb8', boxShadow: '0 0 20px rgba(0, 255, 102, 0.3)',
          maxWidth: '600px', width: '100%'
        }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '20px', fontFamily: '"Press Start 2P", cursive' }}>MISSION COMPLETE</h3>
          <p style={{ fontSize: '0.8rem', marginBottom: '10px', fontFamily: '"Press Start 2P", cursive' }}><strong>SECURE TOKEN RECOVERED:</strong></p>
          <p style={{
            fontSize: '1.2rem', letterSpacing: '5px', color: '#00ff66', 
            textShadow: '0 0 15px rgba(0,255,102,0.6)', margin: '30px 0', wordWrap: 'break-word',
            fontFamily: '"Press Start 2P", cursive'
          }}>
            [ {correctToken} ]
          </p>
        </div>

        <button className="terminal-btn" onClick={onComplete} style={{ marginTop: '50px', fontSize: '0.8rem' }}>
          PROCEED TO DASHBOARD &gt;&gt;
        </button>
      </div>
    );
  }

  const showRiddle = riddles[universeId];

  return (
    <div style={{
      fontFamily: 'monospace',
      background: '#111',
      color: '#eee',
      textAlign: 'center',
      minHeight: '100vh',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 100,
      padding: '60px 20px'
    }}>
      <h1 style={{ color: '#0f0', fontSize: '2rem', marginBottom: '40px' }}>
        Level 5: Universe {universeId}
      </h1>
      
      <div id="content">
        {showRiddle && (
          <div>
            <img src={showRiddle.img} alt="Universe Clue" style={{ width: '280px', borderRadius: '8px', marginTop: '20px' }} />
            
            <div style={{ marginTop: '15px' }}>
              <a href={showRiddle.img} download className="terminal-btn" style={{ textDecoration: 'none', fontSize: '0.8rem', padding: '10px 20px', display: 'inline-block' }}>
                DOWNLOAD IMAGE
              </a>
            </div>

            <p style={{ color: '#ccc', maxWidth: '500px', margin: '20px auto', fontSize: '1.2rem', lineHeight: '1.6' }}>
              {showRiddle.text}
            </p>
          </div>
        )}
      </div>

      {/* Submission Overlay similar to Mission 2 */}
      <div className="mission2-submit-overlay">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ marginBottom: '10px', fontSize: '0.6rem' }}>&gt; LEVEL 5 // SUBMIT KEY:</p>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="terminal-input"
            placeholder="Type key here..."
            style={{ width: '250px', textAlign: 'center', marginBottom: '10px', fontSize: '0.8rem', padding: '10px' }}
          />
          {error && <p style={{ color: 'var(--error-color)', marginBottom: '10px', fontSize: '0.7rem' }}>[ERROR] Invalid key.</p>}
          <button type="submit" className="terminal-btn" style={{ width: '100%', fontSize: '0.8rem', padding: '10px' }}>
            VERIFY KEY
          </button>
          {onSkip && (
            <button 
              type="button"
              className="terminal-btn" 
              onClick={onSkip} 
              style={{ width: '100%', fontSize: '0.7rem', padding: '10px', marginTop: '10px', borderColor: 'var(--error-color)', color: 'var(--error-color)', boxShadow: 'none' }}
            >
              SKIP MISSION (-4)
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Mission5;
