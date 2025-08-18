import React from "react";

const Keyboard = ({ onLetter, onEnter, onDelete }) => {
  const rows = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["Enter","Z","X","C","V","B","N","M","Backspace"]
  ];

  const handleClick = (key) => {
    if (key === "Enter") {
      onEnter();
    } else if (key === "Backspace") {
      onDelete();
    } else {
      onLetter(key);
    }
  };

  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              className="keyboard-key"
              onClick={() => handleClick(key)}
            >
              {key === "Backspace" ? "⌫" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
