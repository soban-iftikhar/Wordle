import React, { useState, useEffect } from 'react';
import Keyboard from './Keyboard';

const Board = () => {
  const words = ["APPLE", "GRAPE", "PEACH", "BERRY", "MELON"];
  const [answer, setAnswer] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guesses, setGuesses] = useState(Array(6).fill("").map(() => Array(5).fill("")));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentBlock, setCurrentBlock] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");


  const handleLetter = (letter) => {
    if (gameOver || currentBlock >= 5) return;
    const newGuesses = guesses.map(row => [...row]);
    newGuesses[currentRow][currentBlock] = letter;
    setGuesses(newGuesses);
    setCurrentBlock(currentBlock + 1);
  };


  const handleDelete = () => {
    if (gameOver || currentBlock === 0) return;
    const newGuesses = guesses.map(row => [...row]);
    newGuesses[currentRow][currentBlock - 1] = "";
    setGuesses(newGuesses);
    setCurrentBlock(currentBlock - 1);
  };


  const handleEnter = () => {
    if (gameOver || currentBlock < 5) return;
    const guessWord = guesses[currentRow].join("");
    console.log("Submitted guess:", guessWord);

    if (guessWord === answer) {
      setMessage("Congratulations! You won!");
      setGameOver(true);
    } else if (currentRow === 5) {
      setMessage(` Game Over! The word was ${answer}`);
      setGameOver(true);
    } else {
      setCurrentRow(currentRow + 1);
      setCurrentBlock(0);
    }
  };


  const setBlockColor = (letter, index, rowIndex) => {
    if (rowIndex >= currentRow) return "";
    if (answer[index] === letter) return "correct";
    if (answer.includes(letter)) return "present";
    return "absent";
  };


  const resetGame = () => {
    setAnswer(words[Math.floor(Math.random() * words.length)]);
    setGuesses(Array(6).fill("").map(() => Array(5).fill("")));
    setCurrentRow(0);
    setCurrentBlock(0);
    setGameOver(false);
    setMessage("");
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;

      if (e.key === "Enter") {
        handleEnter();
      } else if (e.key === "Backspace") {
        handleDelete();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleLetter(e.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver, handleEnter, handleDelete, handleLetter]);


  return (
    <div>
      <h1>Wordle</h1>
      <hr />
    
      {gameOver && (
        <div className="after">
          <p>{message}</p>
          <button className="reset" onClick={resetGame}>Reset</button>
        </div>
      )}
  
    
      <div className="board">
        {guesses.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((block, blockIndex) => (
              <div
                className={`block ${setBlockColor(block, blockIndex, rowIndex)}`}
                key={blockIndex}
              >
                {block}
              </div>
            ))}
          </div>
        ))}
      </div>
      {!gameOver && (
        <Keyboard
          onLetter={handleLetter}
          onDelete={handleDelete}
          onEnter={handleEnter}
        />
      )}
    </div>
  );
};

export default Board;
