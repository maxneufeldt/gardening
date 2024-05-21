//import React from "react"

const imageurls = [
  "url(./images/01-00.png)",
  "url(./images/01-01.png)",
  "url(./images/01-02.png)",
  "url(./images/01-03.png)",
  "url(./images/01-04.png)",
  "url(./images/01-05.png)",
];

export default function Square({ value, onSquareClick }: any) {
  return (
    <button
      style={{
        backgroundImage: `${imageurls[value]}`,
        backgroundSize: "100%",
      }}
      className="square"
      onClick={onSquareClick}
    >
      {value === "X" ? "X" : null}
    </button>
  );
}

//export default Square;
