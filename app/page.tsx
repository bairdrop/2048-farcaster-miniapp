export default function Home() {
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
          <div style={{
            background: 'linear-gradient(to right, #6366f1, #a855f7)',
            color: 'white',
            borderRadius: '0.5rem',
            padding: '2rem'
          }}>
            <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
              App is Working! ✓
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
