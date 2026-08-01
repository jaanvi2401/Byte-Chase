import React, { useState, useEffect } from 'react';

const Mission1 = ({ onComplete, onSkip, universeId }) => {
  const [isGranted, setIsGranted] = useState(false);

  const getMissionToken = () => {
    const universeTokens = {
      1: 'AQUAMAN',
      2: 'HE-MAN',
      3: 'COCKROACH',
      4: 'MELODY',
      5: '19'
    };
    return universeTokens[universeId] || 'UNKNOWN_TOKEN';
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("access") === "granted") {
      setIsGranted(true);
    }
  }, []);

  const handleContinue = () => {
    // Remove the query param from URL without reloading so next missions are clean
    window.history.replaceState({}, document.title, window.location.pathname);
    onComplete();
  };

  if (isGranted) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        width: '100%', height: '100vh', margin: '0 auto', textAlign: 'center',
        background: '#001a00' // Darker green/black background for success
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
            [ {getMissionToken()} ]
          </p>
        </div>

        <button className="terminal-btn" onClick={handleContinue} style={{ marginTop: '50px', fontSize: '0.8rem' }}>
          PROCEED TO DASHBOARD &gt;&gt;
        </button>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      width: '100%', maxWidth: '900px', margin: '0 auto', textAlign: 'center', padding: '2rem'
    }}>
      <h2 style={{ color: '#88ffb4', letterSpacing: '5px', marginBottom: '20px', fontSize: '1.5rem' }}>
        MISSION 1
      </h2>

      <h1 style={{ 
        color: '#ff4444', 
        fontSize: '3.5rem', 
        textShadow: '0 0 5px red',
        marginBottom: '30px'
      }}>
        ACCESS DENIED
      </h1>

      <div className="terminal-gate" style={{ 
        textAlign: 'left', width: '100%', padding: '2rem', 
        background: '#111', marginBottom: '40px', lineHeight: '2', fontSize: '1.1rem' 
      }}>
        <p>&gt; Establishing secure connection...</p>
        <p>&gt; Authenticating user...</p>
        <p>&gt; User Role : GUEST</p>
        <p>&gt; Error 403 : Access Denied</p>
        <p>&gt; Request rejected by gateway.</p>
        <br />
        <p>&gt; Diagnostics:</p>
        <p style={{ color: '#ffd54f', opacity: 0.85 }}>[!] Request validation failed.</p>
        <p style={{ color: '#ffd54f', opacity: 0.85 }}>[!] Required parameter missing.</p>
        <p style={{ color: '#ffd54f', opacity: 0.85 }}>[!] Try reviewing the request URL.</p>
        
        {onSkip && (
          <button 
            className="terminal-btn" 
            onClick={onSkip} 
            style={{ 
              marginTop: '30px', 
              fontSize: '0.8rem', 
              borderColor: 'var(--error-color)',
              color: 'var(--error-color)',
              boxShadow: 'none'
            }}
          >
            SKIP MISSION (-0.25)
          </button>
        )}
      </div>
    </div>
  );
};

export default Mission1;
