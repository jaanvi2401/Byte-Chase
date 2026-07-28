import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import LoginScreen from './components/LoginScreen';
import GatesScreen from './components/GatesScreen';
import HuntScreen from './components/HuntScreen';

function App() {
  const [phase, setPhase] = useState(() => localStorage.getItem('cyberhunt_phase') || 'loading');
  const [selectedGate, setSelectedGate] = useState(() => {
    const saved = localStorage.getItem('cyberhunt_gate');
    return saved ? parseInt(saved) : null;
  });

  // Save to localStorage so state survives the Mission 1 URL refresh
  useEffect(() => {
    localStorage.setItem('cyberhunt_phase', phase);
  }, [phase]);

  useEffect(() => {
    if (selectedGate) {
      localStorage.setItem('cyberhunt_gate', selectedGate.toString());
    } else {
      localStorage.removeItem('cyberhunt_gate');
    }
  }, [selectedGate]);

  const handleLoadingFinish = () => {
    setPhase('login');
  };

  const handleLoginSuccess = () => {
    setPhase('gates');
  };

  const handleGateSelect = (gateId) => {
    setSelectedGate(gateId);
    setPhase('hunt');
  };

  const handleGoHome = () => {
    setPhase('gates');
  };

  return (
    <div className="cyber-body">
      {phase === 'loading' && <LoadingScreen onFinish={handleLoadingFinish} />}
      {phase === 'login' && <LoginScreen onLoginSuccess={handleLoginSuccess} />}
      {phase === 'gates' && <GatesScreen onGateSelect={handleGateSelect} />}
      
      {/* Phase 3 */}
      {phase === 'hunt' && <HuntScreen universeId={selectedGate} onGoHome={handleGoHome} />}
    </div>
  );
}

export default App;
