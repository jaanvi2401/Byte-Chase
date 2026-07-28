import React, { useState, useEffect } from 'react';
import Mission1 from './Mission1';
import Mission2 from './Mission2';
import Mission3 from './Mission3';
import Mission4 from './Mission4';
import Mission5 from './Mission5';

const HuntScreen = ({ universeId, onGoHome }) => {
  const [score, setScore] = useState(() => parseFloat(localStorage.getItem('cyberhunt_score')) || 0);
  const [activeMissionId, setActiveMissionId] = useState(() => {
    const saved = localStorage.getItem('cyberhunt_active_mission');
    return saved ? parseInt(saved) : null;
  });
  
  const [missions, setMissions] = useState(() => {
    const saved = localStorage.getItem('cyberhunt_missions');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, name: 'MISSION_01: Reconnaissance', status: 'AVAILABLE' },
      { id: 2, name: 'MISSION_02: Deep Inspection', status: 'LOCKED' },
      { id: 3, name: 'MISSION_03: Access Bypass', status: 'LOCKED' },
      { id: 4, name: 'MISSION_04: Packet Sniffing', status: 'LOCKED' },
      { id: 5, name: 'MISSION_05: Brute Force', status: 'LOCKED' }
    ];
  });

  // Save to localStorage
  useEffect(() => { localStorage.setItem('cyberhunt_score', score.toString()); }, [score]);
  useEffect(() => {
    if (activeMissionId === null) {
      localStorage.removeItem('cyberhunt_active_mission');
    } else {
      localStorage.setItem('cyberhunt_active_mission', activeMissionId.toString());
    }
  }, [activeMissionId]);
  useEffect(() => { localStorage.setItem('cyberhunt_missions', JSON.stringify(missions)); }, [missions]);

  const unlockNextMission = (currentId) => {
    setMissions(prev => prev.map(m => {
      if (m.id === currentId + 1) return { ...m, status: 'AVAILABLE' };
      return m;
    }));
  };

  const getMissionToken = (id) => {
    const allTokens = {
      1: { 1: 'DUNES', 2: 'HE-MAN', 3: 'COCKROACH', 4: 'MELODY', 5: 'GRAMOPHONE' },
      2: { 1: 'TRIDENT', 2: 'THOR', 3: 'HADDI', 4: 'PAPPU', 5: 'BOOKSHELVES' },
      3: { 1: 'WINDMILL', 2: 'RAVI KISHAN', 3: 'PLUTO', 4: 'HAT', 5: 'WINE BOTTLES' },
      4: { 1: 'CASTLE', 2: 'AAMIR KHAN', 3: 'DORA', 4: 'PUTIN', 5: 'NINJA' },
      5: { 1: 'AURORA', 2: 'DEADPOOL', 3: 'SAMURAI', 4: 'UNKNOWN', 5: 'COFFIN' }
    };
    return allTokens[id] ? (allTokens[id][universeId] || 'UNKNOWN_TOKEN') : 'UNKNOWN_TOKEN';
  };

  const handleExecute = (missionId) => {
    setActiveMissionId(missionId);
  };

  const handleCompleteMission = () => {
    setScore(prev => prev + 1);
    setMissions(prev => prev.map(m => m.id === activeMissionId ? { ...m, status: 'COMPLETED' } : m));
    unlockNextMission(activeMissionId);
    setActiveMissionId(null);
  };

  const handleSkip = (missionId) => {
    setScore(prev => prev - 0.25);
    setMissions(prev => prev.map(m => m.id === missionId ? { ...m, status: 'SKIPPED' } : m));
    unlockNextMission(missionId);
  };

  if (activeMissionId !== null) {
    if (activeMissionId === 1) {
      return (
        <div style={{ height: '100%', width: '100%', overflowY: 'auto' }}>
          <Mission1 onComplete={handleCompleteMission} universeId={universeId} />
        </div>
      );
    }
    if (activeMissionId === 2) {
      return (
        <div style={{ width: '100%', height: '100vh', overflowY: 'auto', position: 'relative' }}>
          <Mission2 onComplete={handleCompleteMission} universeId={universeId} />
        </div>
      );
    }

    if (activeMissionId === 3) {
      return (
        <div style={{ width: '100%', height: '100vh', overflowY: 'auto', position: 'relative' }}>
          <Mission3 onComplete={handleCompleteMission} universeId={universeId} />
        </div>
      );
    }

    if (activeMissionId === 4) {
      return (
        <div style={{ width: '100%', height: '100vh', overflowY: 'auto', position: 'relative' }}>
          <Mission4 onComplete={handleCompleteMission} universeId={universeId} />
        </div>
      );
    }
    
    if (activeMissionId === 5) {
      return (
        <div style={{ width: '100%', height: '100vh', overflowY: 'auto', position: 'relative' }}>
          <Mission5 onComplete={handleCompleteMission} universeId={universeId} />
        </div>
      );
    }

    const activeMission = missions.find(m => m.id === activeMissionId);
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        height: '100%', width: '100%', padding: '2rem'
      }}>
        <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>&gt; EXECUTING {activeMission.name}</h2>
        <div className="terminal-gate" style={{ padding: '4rem', textAlign: 'center', width: '100%', maxWidth: '800px' }}>
          <p style={{ marginBottom: '3rem', fontSize: '1.2rem', color: 'var(--text-dim)' }}>
            // Challenge interface for Mission {activeMissionId} goes here...
          </p>
          <button className="terminal-btn" onClick={handleCompleteMission}>
            SUBMIT FLAG (COMPLETE MISSION)
          </button>
        </div>
      </div>
    );
  }

  // Otherwise, render the Dashboard
  return (
    <div style={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'flex-start', 
      minHeight: '100%', width: '100%', padding: '2rem', maxWidth: '1200px', margin: '0 auto' 
    }}>
      <div style={{ 
        width: '100%', border: '1px solid var(--text-color)', padding: '1rem', marginBottom: '2rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        boxShadow: '0 0 10px rgba(0, 255, 102, 0.2)'
      }}>
        <h2 style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.5' }}>
          &gt; U_{universeId} // STATUS REPORT
        </h2>
        <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--text-color)', lineHeight: '1.5' }}>
          TOKENS EXTRACTED: <span style={{ color: '#fff' }}>[{score.toFixed(2)} / 5]</span>
        </div>
      </div>

      {/* Mission Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        width: '100%'
      }}>
        {missions.map((mission) => (
          <div key={mission.id} className="terminal-gate" style={{ 
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', 
            minHeight: '260px',
            borderColor: mission.status === 'LOCKED' ? 'var(--text-dim)' : 'var(--text-color)',
            opacity: mission.status === 'LOCKED' ? 0.5 : 1
          }}>
            <div>
              <div style={{ marginBottom: '1rem', color: 'var(--text-dim)', fontSize: '0.7rem' }}>
                [ TASK_ID: 0{mission.id} ]
              </div>
              <h3 style={{ fontSize: '0.85rem', marginBottom: '1rem', lineHeight: '1.5' }}>{mission.name}</h3>
              <p style={{ 
                fontSize: '0.8rem',
                color: mission.status === 'COMPLETED' ? 'var(--text-color)' : 
                       (mission.status === 'SKIPPED' ? 'var(--error-color)' :
                       (mission.status === 'AVAILABLE' ? 'var(--text-color)' : 'var(--text-dim)')),
                fontWeight: 'bold' 
              }}>
                STATUS: {mission.status}
              </p>
              {(mission.status === 'COMPLETED' || mission.status === 'SKIPPED') && (
                <p style={{ 
                  fontSize: '0.75rem', 
                  color: mission.status === 'COMPLETED' ? '#00ff66' : 'var(--error-color)', 
                  marginTop: '1rem', 
                  fontWeight: 'bold', 
                  textShadow: mission.status === 'COMPLETED' ? '0 0 5px rgba(0,255,102,0.5)' : '0 0 5px rgba(255,0,0,0.5)', 
                  wordWrap: 'break-word' 
                }}>
                  {mission.status === 'COMPLETED' ? 'TOKEN ACCEPTED' : 'TOKEN REJECTED'}
                </p>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button 
                className="terminal-btn" 
                onClick={() => handleExecute(mission.id)}
                disabled={mission.status !== 'AVAILABLE'}
                style={{ 
                  flex: 1,
                  opacity: mission.status !== 'AVAILABLE' ? 0.3 : 1,
                  cursor: mission.status !== 'AVAILABLE' ? 'not-allowed' : 'pointer'
                }}
              >
                {(mission.status === 'COMPLETED' || mission.status === 'SKIPPED') ? 'DATA SECURED' : 
                 (mission.status === 'LOCKED' ? 'LOCKED' : 'EXECUTE')}
              </button>
              
              {/* Skip button only for available missions after mission 1 */}
              {mission.id > 1 && mission.status === 'AVAILABLE' && (
                <button 
                  className="terminal-btn" 
                  onClick={() => handleSkip(mission.id)}
                  style={{ 
                    flex: 1,
                    borderColor: 'var(--error-color)',
                    color: 'var(--error-color)',
                    boxShadow: 'none'
                  }}
                >
                  SKIP (-0.25)
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HuntScreen;
