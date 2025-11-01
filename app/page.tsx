'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Game2048 = dynamic(() => import('../components/Game2048'), {
  ssr: false,
  loading: () => (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <p style={{ fontSize: '1.25rem', color: '#6b7280' }}>Loading game...</p>
    </div>
  )
});

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
        <Game2048 />
      </div>
    </div>
  );
}
