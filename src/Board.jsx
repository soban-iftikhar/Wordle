import React, { useState, useEffect } from 'react'

const Board = () => {
  const words = ["APPLE", "GRAPE", "PEACH", "BERRY", "MELON"];
  const [answer, setAnswer] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guesses, setGuesses] = useState(Array(6).fill("").map(() => Array(5).fill("")));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentBlock, setCurrentBlock] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  const handleInput = (e) => {
    if (gameOver) return;

    const key = e.key.toUpperCase();

    if (/^[A-Z]$/.test(key) && currentBlock < 5) {
      const newGuesses = guesses.map(row => [...row]);
      newGuesses[currentRow][currentBlock] = key;
      setGuesses(newGuesses);
      setCurrentBlock(currentBlock + 1);
    }


    if (key === "BACKSPACE" && currentBlock > 0) {
      const newGuesses = guesses.map(row => [...row]);
      newGuesses[currentRow][currentBlock - 1] = "";
      setGuesses(newGuesses);
      setCurrentBlock(currentBlock - 1);
    }

    if (key === "ENTER" && currentBlock === 5) {
      const guessWord = guesses[currentRow].join("");
      console.log("Submitted guess:", guessWord);

      if (guessWord === answer) {
        setMessage("Congratulations! You won");
        setGameOver(true);
      } else if (currentRow === 5) {
        setMessage(`Game Over! The word was ${answer}`);
        setGameOver(true);
      } else {

        setCurrentRow(currentRow + 1);
        setCurrentBlock(0);
      }
    }
  };


  const setBlockColor = (letter, index, rowIndex) => {
  const guessedWord = guesses[rowIndex].join("");

  if (rowIndex > currentRow) return "";
  if (rowIndex === currentRow) return "";

  if (guessedWord === answer) return "correct";
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
    window.addEventListener("keydown", handleInput);
    return () => window.removeEventListener("keydown", handleInput);
  });

  return (
    <div>
      <h1>Wordle</h1>
      <hr />
      <p>{message}</p>
      <div className="board">
        {guesses.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((block, blockIndex) => (
              <div className={`block ${setBlockColor(block, blockIndex, rowIndex)}`} key={blockIndex}>
                {block}
              </div>

            ))}
          </div>
        ))}
      </div>
      {gameOver && <button onClick={resetGame}>Reset</button>}
    </div>
  );
};

export default Board;
