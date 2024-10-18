import React, { useState } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;
    
    const newBoard = board.slice();
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (board.every(Boolean)) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="board">
        {board.map((_, index) => (
          <span key={index}>{renderSquare(index)}</span>
        ))}
      </div>
      <button className="reset" onClick={resetGame}>Reset Game</button>
      
      <style jsx>{`
        .game {
          font-family: Arial, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;
        }
        .status {
          margin-bottom: 10px;
          font-size: 24px;
        }
        .board {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 5px;
          margin-bottom: 20px;
        }
        .square {
          width: 80px;
          height: 80px;
          font-size: 24px;
          font-weight: bold;
          background: #fff;
          border: 1px solid #999;
          cursor: pointer;
        }
        .reset {
          font-size: 18px;
          padding: 10px 20px;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default TicTacToe;