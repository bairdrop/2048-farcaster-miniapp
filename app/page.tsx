'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(to bottom right, #dbeafe, #e0e7ff)',
      padding: '1rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        padding: '2rem',
        maxWidth: '28rem',
        width: '100%'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '2.25rem', 
            fontWeight: 'bold', 
            color: '#4f46e5',
            marginBottom: '1rem'
          }}>
            2048 Farcaster
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
            The classic puzzle game
          </p>
          
          {/* Game will go here */}
          <div style={{
            background: 'linear-gradient(to right, #6366f1, #a855f7)',
            color: 'white',
            borderRadius: '0.5rem',
            padding: '2rem',
            marginBottom: '1rem'
          }}>
            <p style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Ready to Play! ✓
            </p>
            <button
              style={{
                background: 'white',
                color: '#4f46e5',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
              onClick={() => alert('Game starting soon!')}
            >
              Start Game
            </button>
          </div>

          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            <p>Use arrow keys or swipe to play</p>
            <p>Merge tiles to reach 2048!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
