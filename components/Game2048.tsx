'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface LeaderboardEntry {
  username: string;
  score: number;
  timestamp: number;
}

const Game2048 = () => {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'game' | 'leaderboard'>('home');
  const [gameMode, setGameMode] = useState<'normal' | 'timed'>('normal');
  const [timeLeft, setTimeLeft] = useState(30);
  const [grid, setGrid] = useState<number[][]>([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [username, setUsername] = useState('');
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const SIZE = 4;

  useEffect(() => {
    setMounted(true);
    const loadData = async () => {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('2048-best');
        if (saved) setBestScore(parseInt(saved));
      }
    };
    
    if (typeof window !== 'undefined') {
      loadData();
    }
  }, []);

  useEffect(() => {
    if (currentScreen === 'game' && gameMode === 'timed' && !gameOver && !won && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentScreen, gameMode, gameOver, won, timeLeft]);

  const startGame = (mode: 'normal' | 'timed') => {
    setGameMode(mode);
    setTimeLeft(30);
    initGame();
    setCurrentScreen('game');
  };

  const initGame = () => {
    const newGrid = Array(SIZE).fill(null).map(() => Array(SIZE).fill(0));
    addNewTile(newGrid);
    addNewTile(newGrid);
    setGrid(newGrid);
    setScore(0);
    setGameOver(false);
    setWon(false);
  };

  const addNewTile = (currentGrid: number[][]) => {
    const empty: [number, number][] = [];
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (currentGrid[i][j] === 0) empty.push([i, j]);
      }
    }
    if (empty.length > 0) {
      const [row, col] = empty[Math.floor(Math.random() * empty.length)];
      currentGrid[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  const slideAndMergeRow = (row: number[]) => {
    let newRow = row.filter(val => val !== 0);
    let addScore = 0;
    
    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] === newRow[i + 1]) {
        newRow[i] = newRow[i] * 2;
        addScore += newRow[i];
        if (newRow[i] === 2048) {
          setWon(true);
        }
        newRow[i + 1] = 0;
      }
    }
    
    newRow = newRow.filter(val => val !== 0);
    
    while (newRow.length < SIZE) {
      newRow.push(0);
    }
    
    return { row: newRow, score: addScore };
  };

  const moveLeft = () => {
    let newGrid: number[][] = [];
    let totalScore = 0;
    let moved = false;

    for (let i = 0; i < SIZE; i++) {
      const { row, score } = slideAndMergeRow(grid[i]);
      newGrid.push(row);
      totalScore += score;
      
      if (JSON.stringify(row) !== JSON.stringify(grid[i])) {
        moved = true;
      }
    }

    if (moved) {
      addNewTile(newGrid);
      updateScore(totalScore);
      setGrid(newGrid);
      checkGameOver(newGrid);
    }
  };

  const moveRight = () => {
    let newGrid: number[][] = [];
    let totalScore = 0;
    let moved = false;

    for (let i = 0; i < SIZE; i++) {
      const reversed = [...grid[i]].reverse();
      const { row, score } = slideAndMergeRow(reversed);
      newGrid.push(row.reverse());
      totalScore += score;
      
      if (JSON.stringify(newGrid[i]) !== JSON.stringify(grid[i])) {
        moved = true;
      }
    }

    if (moved) {
      addNewTile(newGrid);
      updateScore(totalScore);
      setGrid(newGrid);
      checkGameOver(newGrid);
    }
  };

  const moveUp = () => {
    let newGrid = Array(SIZE).fill(null).map(() => Array(SIZE).fill(0));
    let totalScore = 0;
    let moved = false;

    for (let j = 0; j < SIZE; j++) {
      const column: number[] = [];
      for (let i = 0; i < SIZE; i++) {
        column.push(grid[i][j]);
      }
      
      const { row, score } = slideAndMergeRow(column);
      totalScore += score;
      
      for (let i = 0; i < SIZE; i++) {
        newGrid[i][j] = row[i];
      }
      
      const originalColumn = grid.map(r => r[j]).join(',');
      const newColumn = row.join(',');
      if (originalColumn !== newColumn) {
        moved = true;
      }
    }

    if (moved) {
      addNewTile(newGrid);
      updateScore(totalScore);
      setGrid(newGrid);
      checkGameOver(newGrid);
    }
  };

  const moveDown = () => {
    let newGrid = Array(SIZE).fill(null).map(() => Array(SIZE).fill(0));
    let totalScore = 0;
    let moved = false;

    for (let j = 0; j < SIZE; j++) {
      const column: number[] = [];
      for (let i = SIZE - 1; i >= 0; i--) {
        column.push(grid[i][j]);
      }
      
      const { row, score } = slideAndMergeRow(column);
      totalScore += score;
      
      for (let i = 0; i < SIZE; i++) {
        newGrid[SIZE - 1 - i][j] = row[i];
      }
      
      const originalColumn = grid.map(r => r[j]).reverse().join(',');
      const newColumn = row.join(',');
      if (originalColumn !== newColumn) {
        moved = true;
      }
    }

    if (moved) {
      addNewTile(newGrid);
      updateScore(totalScore);
      setGrid(newGrid);
      checkGameOver(newGrid);
    }
  };

  const updateScore = (addScore: number) => {
    const newScore = score + addScore;
    setScore(newScore);
    if (newScore > bestScore) {
      setBestScore(newScore);
      if (typeof window !== 'undefined') {
        localStorage.setItem('2048-best', newScore.toString());
      }
    }
  };

  const checkGameOver = (currentGrid: number[][]) => {
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (currentGrid[i][j] === 0) return;
      }
    }

    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (j < SIZE - 1 && currentGrid[i][j] === currentGrid[i][j + 1]) return;
        if (i < SIZE - 1 && currentGrid[i][j] === currentGrid[i + 1][j]) return;
      }
    }

    setGameOver(true);
  };

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (gameOver || currentScreen !== 'game') return;
    
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      moveLeft();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      moveRight();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      moveUp();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      moveDown();
    }
  }, [grid, gameOver, currentScreen]);

  useEffect(() => {
    if (mounted) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [handleKeyPress, mounted]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart || gameOver) return;

    const deltaX = e.changedTouches[0].clientX - touchStart.x;
    const deltaY = e.changedTouches[0].clientY - touchStart.y;
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > minSwipeDistance) {
        deltaX > 0 ? moveRight() : moveLeft();
      }
    } else {
      if (Math.abs(deltaY) > minSwipeDistance) {
        deltaY > 0 ? moveDown() : moveUp();
      }
    }

    setTouchStart(null);
  };

  const getTileColor = (value: number) => {
    const colors: {[key: number]: string} = {
      0: '#cdc1b4',
      2: '#eee4da',
      4: '#ede0c8',
      8: '#f2b179',
      16: '#f59563',
      32: '#f67c5f',
      64: '#f65e3b',
      128: '#edcf72',
      256: '#edcc61',
      512: '#edc850',
      1024: '#edc53f',
      2048: '#edc22e',
    };
    return colors[value] || '#3c3a32';
  };

  const getTileTextColor = (value: number) => {
    return value <= 4 ? '#776e65' : '#f9f6f2';
  };

  if (!mounted) {
    return null;
  }

  if (currentScreen === 'home') {
    return (
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '100px', height: '100px', background: '#edc22e', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 'bold', color: 'white' }}>
            2048
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <button
            onClick={() => startGame('timed')}
            style={{
              width: '100%',
              background: 'linear-gradient(to right, #f97316, #ef4444)',
              color: 'white',
              fontWeight: 'bold',
              padding: '1rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem'
            }}
          >
            ⏱️ Play Against Time (30s)
          </button>
          
          <button
            onClick={() => startGame('normal')}
            style={{
              width: '100%',
              background: 'linear-gradient(to right, #6366f1, #a855f7)',
              color: 'white',
              fontWeight: 'bold',
              padding: '1rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem'
            }}
          >
            🎮 Play Normal Game
          </button>
          
          <button
            onClick={() => setCurrentScreen('leaderboard')}
            style={{
              width: '100%',
              background: 'linear-gradient(to right, #10b981, #14b8a6)',
              color: 'white',
              fontWeight: 'bold',
              padding: '1rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem'
            }}
          >
            🏆 Leaderboard
          </button>
        </div>

        <div style={{ textAlign: 'center', color: '#6b7280' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4f46e5', marginBottom: '1rem' }}>How to Play</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
            <p>Use arrow keys on desktop or swipe on mobile to move tiles.</p>
            <p>When two tiles with the same number touch, they merge into one!</p>
            <p style={{ fontWeight: '600' }}>Goal: Reach the 2048 tile to win!</p>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'leaderboard') {
    return (
      <div style={{ width: '100%' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#4f46e5', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            🏆 Leaderboard
          </h1>
        </div>
        
        <div style={{ minHeight: '400px', marginBottom: '1.5rem' }}>
          {leaderboard.length === 0 ? (
            <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>No scores yet. Be the first!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {leaderboard.map((entry, index) => (
                <div
                  key={index}
                  style={{
                    background: 'linear-gradient(to right, #eef2ff, #f5f3ff)',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '2px solid #e0e7ff'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#4f46e5', width: '2.5rem' }}>
                      {index + 1}
                    </span>
                    <span style={{ fontWeight: 'bold', color: '#1f2937', fontSize: '1.125rem' }}>{entry.username}</span>
                  </div>
                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4f46e5' }}>{entry.score}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => setCurrentScreen('home')}
          style={{
            width: '100%',
            background: '#374151',
            color: 'white',
            borderRadius: '0.5rem',
            padding: '0.75rem',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
          <div style={{ width: '64px', height: '64px', background: '#edc22e', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
            2048
          </div>
        </div>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Join tiles to reach 2048!</p>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '80px', background: 'linear-gradient(to right, #6366f1, #a855f7)', borderRadius: '0.5rem', padding: '0.75rem', color: 'white' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '600' }}>SCORE</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{score}</div>
        </div>
        <div style={{ flex: 1, minWidth: '80px', background: 'linear-gradient(to right, #f97316, #ef4444)', borderRadius: '0.5rem', padding: '0.75rem', color: 'white' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '600' }}>🏆 BEST</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{bestScore}</div>
        </div>
        {gameMode === 'timed' && (
          <div style={{ flex: 1, minWidth: '80px', background: 'linear-gradient(to right, #ef4444, #ec4899)', borderRadius: '0.5rem', padding: '0.75rem', color: 'white' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '600' }}>⏱️ TIME</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{timeLeft}s</div>
          </div>
        )}
        <button
          onClick={initGame}
          style={{
            background: '#374151',
            color: 'white',
            borderRadius: '0.5rem',
            padding: '0 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.5rem'
          }}
          title="New Game"
        >
          🔄
        </button>
      </div>

      <div 
        style={{ 
          background: '#bbada0', 
          borderRadius: '0.75rem', 
          padding: '0.75rem', 
          marginBottom: '1.5rem',
          position: 'relative'
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
          {grid.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                style={{
                  aspectRatio: '1',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: cell >= 1024 ? '1.5rem' : cell >= 128 ? '1.875rem' : '2.25rem',
                  background: getTileColor(cell),
                  color: getTileTextColor(cell),
                  transition: 'all 0.1s'
                }}
              >
                {cell !== 0 && cell}
              </div>
            ))
          )}
        </div>

        {(gameOver || won) && (
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'rgba(0, 0, 0, 0.8)', 
            borderRadius: '0.75rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
                {won && !gameOver ? '🎉 You Won!' : gameOver ? '💀 Game Over' : '🎉 You Won!'}
              </div>
              <div style={{ fontSize: '1.5rem', color: 'white', marginBottom: '1rem' }}>
                Score: {score}
              </div>
              
              <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: '2px solid #6366f1',
                  textAlign: 'center',
                  marginBottom: '1rem',
                  width: '100%',
                  maxWidth: '20rem',
                  fontSize: '1rem'
                }}
                maxLength={20}
              />
              
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={initGame}
                  style={{
                    background: '#6366f1',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Play Again
                </button>
                <button
                  onClick={() => {
                    if (!username.trim()) {
                      alert('Please enter a username first!');
                      return;
                    }
                    const appUrl = window.location.origin;
                    const text = `🎮 I scored ${score} in 2048 Farcaster! Can you beat it?\n\n${appUrl}`;
                    const shareUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}`;
                    window.open(shareUrl, '_blank');
                  }}
                  style={{
                    background: 'linear-gradient(to right, #10b981, #14b8a6)',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Share Score
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
        <p style={{ marginBottom: '0.25rem' }}>Use arrow keys or swipe to play</p>
        <p style={{ fontSize: '0.75rem' }}>Merge tiles with same numbers to reach 2048!</p>
      </div>
    </div>
  );
};

export default Game2048;
