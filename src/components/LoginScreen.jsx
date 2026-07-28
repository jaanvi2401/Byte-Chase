import React, { useState } from 'react';

const LoginScreen = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.toUpperCase() === 'BYTECHASE') {
      setError(false);
      onLoginSuccess();
    } else {
      setError(true);
      setPassword('');
    }
  };

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
      <h2 style={{ marginBottom: '2rem' }}>
        &gt; ROOT ACCESS REQUIRED
      </h2>
      
      <form onSubmit={handleSubmit} style={{ width: '400px', maxWidth: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '1rem', fontSize: '1.2rem' }}>$</span>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="terminal-input"
            placeholder="Enter authentication key..."
            autoFocus
          />
        </div>
        
        {error && (
          <p style={{ color: 'var(--error-color)', marginBottom: '1.5rem', textShadow: '0 0 5px var(--error-color)' }}>
            [ERROR]: Authentication failed.
          </p>
        )}

        <button type="submit" className="terminal-btn">
          EXECUTE
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;
