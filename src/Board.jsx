import React, { useState, useEffect } from 'react';

import Keyboard from './Keyboard';

const Board = () => {

  const words = ["APPLE", "GRAPE", "PEACH", "BERRY", "MELON", "QUILT", "JUMBO", "ZEBRA", "PIXEL", "KNACK"];
  const [answer, setAnswer] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guesses, setGuesses] = useState(Array(6).fill("").map(() => Array(5).fill("")));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentBlock, setCurrentBlock] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  const handleInput = (key) => {

    if (gameOver) return;
    key = key.toUpperCase();

    if (key === "ENTER") {
      if (currentBlock < 5) return;
      const guessWord = guesses[currentRow].join("");
      if (guessWord === answer) {
        setMessage("Congratulations! You won!");
        setGameOver(true);
      }

      else if (currentRow === 5) {

        setMessage( `Game over! word was ${ answer}`);
        setGameOver(true);
      }

      else {
        setCurrentRow(currentRow + 1);
        setCurrentBlock(0);
      }
    }

    else if (key === "BACKSPACE") {
      if (currentBlock === 0) return;
      const newGuesses = guesses.map(row => [...row]);
      newGuesses[currentRow][currentBlock - 1] = "";
      setGuesses(newGuesses);
      setCurrentBlock(currentBlock - 1);
    }

    else if (/^[A-Z]$/.test(key)) {
      if (currentBlock >= 5) return;
      const newGuesses = guesses.map(row => [...row]);
      newGuesses[currentRow][currentBlock] = key;
      setGuesses(newGuesses);
      setCurrentBlock(currentBlock + 1);
    }
  };

  
 const setBlockColor = (letter, index, rowIndex) => {
  const guessedWord = guesses[rowIndex].join("");
  const isRowSubmitted = rowIndex < currentRow || gameOver;

   if (!isRowSubmitted || !letter) return "";

  if (answer[index] === letter) return "correct";
  if (answer.includes(letter)) return "present";
  return "absent";
};


const getLetterStatuses = () => {
  const statuse = {};
  guesses.forEach((row, rowIndex) => {
    if (rowIndex < currentRow || gameOver) {
      row.forEach((letter, i) => {
        if (!letter) return;
        if (answer[i] === letter) {
          statuse[letter] = "correct";
        } 
        else if (answer.includes(letter)) {
          if (statuse[letter] !== "correct") {
            statuse[letter] = "present";
          }
        } 
        else {
          if (!statuse[letter]) {
            statuse[letter] = "absent";
          }
        }
      });
    }
  });
  return statuse;
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
      handleInput(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentRow, currentBlock, guesses, gameOver]);


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

  {
    !gameOver && (
      <Keyboard
        onLetter={handleInput}
        onDelete={handleInput}
        onEnter={handleInput}
        letterStatuses={getLetterStatuses()}
      />
    )
  }
</div >

);
};

export default Board;

