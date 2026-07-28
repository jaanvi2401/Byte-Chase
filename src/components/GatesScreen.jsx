import React from 'react';

const GatesScreen = ({ onGateSelect }) => {
  const gates = [
    { id: 1, name: 'UNIVERSE_01.sys' },
    { id: 2, name: 'UNIVERSE_02.sys' },
    { id: 3, name: 'UNIVERSE_03.sys' },
    { id: 4, name: 'UNIVERSE_04.sys' },
    { id: 5, name: 'UNIVERSE_05.sys' }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      padding: '2rem'
    }}>
      <h2 style={{ marginBottom: '0.5rem', fontSize: '1rem', lineHeight: '1.5', textAlign: 'center' }}>
        &gt; DIRECTORY_LISTING: /mnt/gates/
      </h2>
      <p style={{
        color: 'var(--text-dim)',
        marginBottom: '3rem',
        fontSize: '0.7rem',
        textAlign: 'center'
      }}>
        // SELECT TARGET UNIVERSE AS ASSIGNED BY ADMIN
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        width: '100%',
        maxWidth: '1200px'
      }}>
        {gates.map((gate) => (
          <div 
            key={gate.id} 
            className="terminal-gate"
            onClick={() => onGateSelect(gate.id)}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <div style={{ marginBottom: '1rem', color: 'var(--text-dim)', fontSize: '0.7rem' }}>
              [ NODE_{gate.id} ]
            </div>
            <h3 style={{ fontSize: '0.85rem', lineHeight: '1.5', wordWrap: 'break-word' }}>{gate.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GatesScreen;
