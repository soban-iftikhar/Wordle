import React from "react";
import { MdBackspace } from 'react-icons/md';

const Keyboard = ({ onLetter, onEnter, onDelete, letterStatuses }) => {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"]
  ];

  const handleClick = (key) => {
    if (key === "Enter") {
      onEnter(key);
    }
    else if (key === "Backspace") {
      onDelete(key);
    }
    else {
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
              className={`keyboard-key ${letterStatuses && letterStatuses[key] ? letterStatuses[key] : ""}`}
              onClick={() => handleClick(key)}
            >
              {key === "Backspace" ? <MdBackspace /> : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;