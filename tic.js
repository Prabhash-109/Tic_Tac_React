import React, { useState } from 'react';

// Square component represents a single cell in the game board
const Square = ({ value, onClick }) => (
  <button className="w-16 h-16 bg-white border border-gray-400 text-2xl font-bold" onClick={onClick}>
    {value}
  </button>
);

// Board component represents the game board
const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => (
    <Square value={squares[i]} onClick={() => handleClick(i)} />
  );

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (squares.every(Boolean)) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-xl font-bold">{status}</div>
      <div className="grid grid-cols-3 gap-0">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i}>{renderSquare(i)}</div>
        ))}
      </div>
    </div>
  );
};

// Helper function to calculate the winner
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

// Game component is the main component that renders the Board
const Game = () => (
  <div className="flex justify-center items-center h-screen">
    <Board />
  </div>
);

export default Game;