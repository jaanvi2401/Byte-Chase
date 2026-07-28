import React, { useEffect, useState } from 'react';

const LoadingScreen = ({ onFinish }) => {
  const [text, setText] = useState('');
  const fullText = "INITIALIZING BYTECHASE PROTOCOL...";

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(typing);
        setTimeout(() => onFinish(), 1000);
      }
    }, 50);

    return () => clearInterval(typing);
  }, [onFinish]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      padding: '4rem'
    }}>
      <h1 
        className="glitch-text" 
        data-text="BYTECHASE"
        style={{ fontSize: '4rem', marginBottom: '2rem' }}
      >
        BYTECHASE
      </h1>
      
      <p style={{ fontSize: '1.2rem' }}>
        &gt; {text}<span className="cursor-blink">_</span>
      </p>
    </div>
  );
};

export default LoadingScreen;
