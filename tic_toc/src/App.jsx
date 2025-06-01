import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const checkWinner = (board) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return board.every(cell => cell !== null) ? "draw" : null;
  };

  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      setWinner(result);
    }
  }, [board]);

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
    setWinner(null);
  };

  const renderMessage = () => {
    if (winner === "draw") return "It's a Draw!";
    if (winner === "X") return "You are Winner";
    if (winner === "O") return "You are Loser";
    return `Turn: ${isXNext ? "X (You)" : "O (Opponent)"}`;
  };

  return (
    <div className="container">
      <h1>Hello, Chandra Bhushan </h1>
      <h2>Tic Tac Toe</h2>
      <div className="board">
        {board.map((cell, idx) => (
          <div key={idx} className="cell" onClick={() => handleClick(idx)}>
            {cell}
          </div>
        ))}
      </div>
      <h3>{renderMessage()}</h3>
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default App;
