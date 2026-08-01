import React, { useState, useEffect } from 'react';
import './Mission4.css';

const morseCodeMap = {
  'A': '·-', 'B': '-···', 'C': '-·-·', 'D': '-··', 'E': '·', 'F': '··-·', 'G': '--·', 'H': '····', 'I': '··', 'J': '·---', 'K': '-·-', 'L': '·-··', 'M': '--', 'N': '-·', 'O': '---', 'P': '·--·', 'Q': '--·-', 'R': '·-·', 'S': '···', 'T': '-', 'U': '··-', 'V': '···-', 'W': '·--', 'X': '-··-', 'Y': '-·--', 'Z': '--··',
  '0': '-----', '1': '·----', '2': '··---', '3': '···--', '4': '····-', '5': '·····', '6': '-····', '7': '--···', '8': '---··', '9': '----·'
};

const textToMorse = (text) => {
  return text.toUpperCase().split('').map(char => {
    if (morseCodeMap[char]) return morseCodeMap[char];
    if (char === ' ') return '  ';
    return char;
  }).join('  ');
};

const Mission4 = ({ onComplete, universeId }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const [isGranted, setIsGranted] = useState(false);

  const getMissionToken = () => {
    const universeTokens = {
      1: 'TRIDENT',
      2: 'THOR',
      3: 'HADDI',
      4: 'PAPPU',
      5: 'BOOKSHELVES'
    };
    return universeTokens[universeId] || 'UNKNOWN_TOKEN';
  };

  const correctToken = getMissionToken();
  const morseToken = textToMorse(correctToken);

  useEffect(() => {
    // Disable default behavior on all a/button tags just like the user requested
    const handlePreventDefault = (e) => {
      const target = e.target;
      if (target.tagName === 'A' || target.tagName === 'BUTTON') {
        if (!target.classList.contains('terminal-btn')) { // Don't prevent our own submit buttons
          e.preventDefault();
        }
      }
    };
    document.addEventListener('click', handlePreventDefault);
    return () => {
      document.removeEventListener('click', handlePreventDefault);
    };
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
        width: '100%', height: '100vh', margin: '0 auto', textAlign: 'center',
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
          <h3 style={{ fontSize: '1rem', marginBottom: '20px' }}>MISSION COMPLETE</h3>
          <p style={{ fontSize: '0.8rem', marginBottom: '10px' }}><strong>SECURE TOKEN RECOVERED:</strong></p>
          <p style={{
            fontSize: '1.2rem', letterSpacing: '5px', color: '#00ff66', 
            textShadow: '0 0 15px rgba(0,255,102,0.6)', margin: '30px 0', wordWrap: 'break-word'
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

  // The hidden comment with dynamic morse code!
  const hiddenHTML = `
<!--
=====================================================
TODO - REMOVE BEFORE DEPLOYMENT
QA Team,

The staging server is still using the temporary
authentication phrase.

"${morseToken}"

Do NOT leave this in production!
=====================================================
-->
  `;

  return (
    <>
      <div className="company-page">
        <header className="company-header">
          <h1 className="company-logo">NEXORA TECHNOLOGIES</h1>
          <nav>
            <a href="#">Home</a>
            <a href="#">Services</a>
            <a href="#">Solutions</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </nav>
        </header>

        <section className="hero">
          <h2>Innovating Tomorrow's Digital World</h2>
          <p>
            Nexora Technologies provides enterprise-grade
            software solutions trusted by organizations
            worldwide.
          </p>
          <button>Learn More</button>
          <button>Our Services</button>
        </section>

        <section className="about">
          <h2>About Us</h2>
          <p dangerouslySetInnerHTML={{ __html: `We specialize in cloud infrastructure, AI-driven automation, and cybersecurity consulting. ${hiddenHTML}` }} />
        </section>

        <section className="services">
          <h2>Our Services</h2>
          <div className="cards">
            <div className="card">
              <h3>Cloud Solutions</h3>
              <p>Scalable cloud platforms for businesses.</p>
            </div>
            <div className="card">
              <h3>Cyber Security</h3>
              <p>Protecting organizations from modern threats.</p>
            </div>
            <div className="card">
              <h3>Artificial Intelligence</h3>
              <p>Automation powered by intelligent systems.</p>
            </div>
          </div>
        </section>

        <footer>
          ©️ 2026 Nexora Technologies.
          <br /><br />
          "Every line of code tells a story ABOUT US."
        </footer>
      </div>

      <div className="mission4-submit-overlay">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ marginBottom: '10px', fontSize: '0.6rem' }}>&gt; MISSION 2 // SUBMIT KEY:</p>
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
              SKIP MISSION (-0.25)
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default Mission4;
