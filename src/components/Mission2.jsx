import React, { useState, useEffect } from 'react';
import './Mission2.css';

const Mission2 = ({ onComplete, onSkip, universeId }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const [isGranted, setIsGranted] = useState(false);

  const getMissionToken = () => {
    const universeTokens = {
      1: 'CASTLE',
      2: 'AAMIR KHAN',
      3: 'DORA',
      4: 'PUTIN',
      5: 'NINJA'
    };
    return universeTokens[universeId] || 'UNKNOWN';
  };

  const correctToken = getMissionToken();

  useEffect(() => {
    // This fetch request is the puzzle!
    // Players must open the Network tab to see the response payload.
    fetch(`/api/token_${universeId}.json`)
      .then(r => r.json())
      .then(data => {
        console.log("Network request completed. Hint: Look at the Network tab in DevTools!");
      })
      .catch(err => {
        console.log("Network request failed, but that's okay for the puzzle.");
      });
  }, [universeId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim().toUpperCase() === correctToken.toUpperCase()) {
      setIsGranted(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (isGranted) {
    return (
      <div style={{
        width: '100%', height: '100vh', background: '#0a0a0a', color: '#00ff66',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"Press Start 2P", cursive', textAlign: 'center', position: 'absolute', top: 0, left: 0, zIndex: 100
      }}>
        <div style={{ padding: '40px', border: '2px solid #00ff66', borderRadius: '10px', backgroundColor: 'rgba(0,255,102,0.05)', boxShadow: '0 0 30px rgba(0,255,102,0.2)' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#fff' }}>MISSION COMPLETE</h3>
          <p style={{ fontSize: '0.8rem', marginBottom: '10px' }}><strong>INTERCEPTED PACKET:</strong></p>
          <p style={{
            fontSize: '1.5rem', letterSpacing: '5px', color: '#00ff66',
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

  return (
    <div className="mission2-page">
      <header className="mission2-header">
        <h1>🔎 Inspect Element</h1>
      </header>

      <div className="mission2-container">
        <div className="mission2-grid">
          <div className="mission2-card">
            <h2>📄 Elements</h2>
            <p>Inspect HTML tags, IDs, classes and page structure.</p>
            <p>The Elements panel shows the live DOM tree of the page. Right-click any element and choose "Inspect" to jump straight to it, or use Ctrl+Shift+C (Cmd+Option+C on Mac) to pick an element directly from the page. Edit HTML attributes in real time, view computed styles, and see which CSS rules apply to each element. Use the arrow keys to navigate the tree and the search box to find specific nodes.</p>
          </div>

          <div className="mission2-card">
            <h2>🎨 Styles</h2>
            <p>Modify CSS properties and experiment with colours.</p>
            <p>The Styles sidebar (next to the Elements panel) shows all CSS rules applied to the selected element. Toggle properties on and off with a checkbox, edit values live, and see changes instantly. Use the color picker to experiment with colours, add new declarations, or inspect which styles are inherited. Overridden rules appear strikethrough so you can debug conflicts easily, and the Computed tab shows the final resolved values for every property.</p>
          </div>

          <div className="mission2-card">
            <h2>💻 Console</h2>
            <p>View logs, warnings and JavaScript output.</p>
            <p>The Console tab lets you run JavaScript in the context of the current page. View console.log, console.warn, and console.error messages, interact with the page's objects and functions, and debug code with ease. Use the up/down arrow keys to cycle through command history, and the $0, $1 shortcuts to reference the currently selected element in the Elements panel. Filter output by level (Verbose, Log, Warn, Error) using the filter buttons at the top.</p>
          </div>

          <div className="mission2-card mission2-network">
            <h2>🌐 Network</h2>
            <p>Monitor requests between the browser and the server.</p>
            <p>The Network panel records every HTTP request the page makes — HTML, CSS, JS, images, XHR/fetch calls, and more. Click any entry to inspect headers, payload, response body, and timing details. Use the filter buttons to narrow by type (XHR, JS, CSS, Img, etc.), and enable "Preserve log" to keep entries across page reloads. Great for debugging slow loads, failed requests, and API responses — hover over the timeline for a visual breakdown of where time was spent.</p>
          </div>

          <div className="mission2-card">
            <h2>💾 Application</h2>
            <p>View Cookies, Local Storage and Session Storage.</p>
            <p>The Application panel (called "Storage" in some browsers) lets you inspect and manage all client-side data: Cookies, Local Storage, Session Storage, IndexedDB, and Cache Storage. View, add, edit, or delete stored key-value pairs, examine cookie attributes like expiry and security flags, and debug service worker caches. Essential for understanding how web apps persist data across sessions and for troubleshooting storage-related issues.</p>
          </div>

          <div className="mission2-card mission2-sources">
            <h2>📂 Sources</h2>
            <p>Browse JavaScript and frontend source files.</p>
            <p>The Sources panel displays all files loaded by the page — HTML, CSS, JS, images, and more. Set breakpoints, step through code line by line, inspect call stacks, and watch variable values change in real time. Use the Pretty Print button to format minified files, and the Call Stack pane to trace how your code was reached. Perfect for debugging JavaScript logic and understanding how scripts interact with the DOM and each other.</p>
          </div>
        </div>

        <div className="mission2-shortcuts">
          <div className="mission2-shortcut">
            <h3>F12</h3>
            <p>Open Developer Tools</p>
          </div>
          <div className="mission2-shortcut">
            <h3>Ctrl + Shift + I</h3>
            <p>Open Inspect Element</p>
          </div>
          <div className="mission2-shortcut">
            <h3>Ctrl + Shift + C</h3>
            <p>Select Any Element</p>
          </div>
        </div>
      </div>

      <div className="mission2-submit-overlay">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ marginBottom: '10px', fontSize: '0.6rem', color: '#00ff66' }}>&gt; LEVEL 2 // SUBMIT KEY:</p>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="terminal-input"
            placeholder="Type key here..."
            style={{ width: '250px', textAlign: 'center', marginBottom: '10px', fontSize: '0.8rem', padding: '10px', background: 'transparent', color: '#00ff66', border: '1px solid #00ff66' }}
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
    </div>
  );
};

export default Mission2;
