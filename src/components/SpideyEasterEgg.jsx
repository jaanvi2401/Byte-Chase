import React, { useState, useEffect } from 'react';
import './Spidey.css';

const SpideyEasterEgg = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Drop down every 2 minutes (120,000 ms)
    const interval = setInterval(() => {
      setIsActive(true);
      
      // Pull him back up after 6 seconds
      setTimeout(() => {
        setIsActive(false);
      }, 6000);
      
    }, 120000); 

    // For testing purposes, uncomment this to see it immediately on load:
    // setTimeout(() => setIsActive(true), 2000);
    // setTimeout(() => setIsActive(false), 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`spidey-container ${isActive ? 'drop-down' : ''}`}>
      <div className="web-string"></div>
      {/* 
        Drop your picture or animation (e.g., spidey.gif) into the 'public' folder. 
        It will automatically show up here! 
      */}
      <div className="spidey-sprite">
        <img src="/spidey.gif" alt="Spider-Man" style={{ width: '120px' }} />
      </div>
    </div>
  );
};

export default SpideyEasterEgg;
