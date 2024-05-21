import { useEffect, useState } from "react";
//import { render } from "react-dom";
//import reactLogo from "./assets/react.svg";
//import viteLogo from "/vite.svg";
import "./App.css";
import Square from "./Square";
//import images from "./images";
//import React {}

// Most basic version:
// Button that when clicked begins timer
// As timer grows plant grows.
//
// Next: Add grid, multiple plants.
// Then store plant growth history.

// Make rare plants that are random variants
// Make fidgeting or moving cursor prevent them
// If ignore timer for much longer after it's done get a frog or a ladybug

// If use silly counters for disabling buttons or starting timer
// Perhaps use counters for secret stats like excess

// Start timer at null,
// Make button work only if timer = null

// Logic:
// Start counter at null & display settime if null

// TODO: Add grid of squares. Squares start at 0, count up to 9 with timer.
// TOTO: Once first countdown completes, move on to second/nth square.
// What data format for square contents?

// TODO: Change from nested object to storing everything as (prop?) within square entity.

// imageurls could become object for multiple plant types

function App() {
  const [counter, setCounter] = useState(null); // can use -1 instead of null
  const [pause, setPause] = useState(false);
  const length = 12;

  // lock so that you cannot change squares while paused:
  // pause = true, counter = true: lock = true
  // pause = false, counter = true: lock = true
  // pause = true, counter = false: lock = false
  // pause = false, counter = false: lock = false
  var locked = counter ? true : false;

  //const [squares, setSquares] = useState(Array(9).fill(null));
  // Try more advanced data storage:
  const [squares, setSquares] = useState({
    0: { value: null, url: null, selected: true },
    1: { value: null, selected: false },
    2: { value: null, selected: false },
    3: { value: null, selected: false },
    4: { value: null, selected: false },
    5: { value: null, selected: false },
    6: { value: null, selected: false },
    7: { value: null, selected: false },
    8: { value: null, selected: false },
  });

  function handleClick(i: any) {
    const selectSquare = squares;
    const unselect = (x: any) => (selectSquare[x].selected = false);
    const select = (z: any) => (selectSquare[z].selected = true);
    for (let y = 0; y < 9; y++) {
      !counter && unselect(y);
    }
    !counter && select(i);
    !counter && setSquares({ ...selectSquare });
  }

  useEffect(() => {
    let timer = setInterval(() => {
      const growSquare = squares;
      const grow = (a: any) =>
        (growSquare[a].value = Math.floor(((length - counter) / length) * 6));
      counter && !pause && setCounter(counter - 1);
      for (let y = 0; y < 9; y++) {
        counter && !pause && growSquare[y].selected && grow(y);
      }
      counter && !pause && setSquares({ ...growSquare });
    }, 1000);
    return () => clearInterval(timer);
  });

  //add logic to unpause when counter reaches 0

  function StartButton() {
    function handleClick() {
      var selx = 0;
      const selectX = (x: any) => (selx = x);
      for (let y = 0; y < 9; y++) {
        squares[y].selected && selectX(y);
      }
      !squares[selx].value && !counter && setCounter(length);
      //does the above need a "!pause &&"? Currently it will increment the square value by 1?
    }

    return (
      <button className="btn default" onClick={handleClick}>
        {counter === null
          ? "Start Timer"
          : counter > 0
          ? "Started"
          : "Start Again"}
      </button>
    );
  }

  function PauseButton() {
    function handleClick() {
      setPause(!pause);
    }

    return (
      <button className="btn default" onClick={handleClick}>
        {pause === false ? "Pause" : "Resume"}
      </button>
    );
  }

  const terns = (y: any) =>
    squares[y].value != null
      ? squares[y].value
      : squares[y].selected
      ? "X"
      : null;

  // const bgimg = (x) =>
  //   squares[x].value != null && squares[x].

  function LogInfo() {
    return (
      <div>
        <div>Log info:</div>
        <>Pause Status: </>
        <>{pause === false ? "false" : "true"}</>
        <br />
        <>Lock status: </>
        <>{locked === false ? "false" : "true"} </>
        <br />
        <>True counter value: </>
        <>{counter == null ? "null" : counter} </>
        <br />
        <div>
          Selected square(s):
          {squares[0].selected && "1"}
          {squares[1].selected && "2"}
          {squares[2].selected && "3"}
          {squares[3].selected && "4"}
          {squares[4].selected && "5"}
          {squares[5].selected && "6"}
          {squares[6].selected && "7"}
          {squares[7].selected && "8"}
          {squares[8].selected && "9"}
        </div>
        <div>Value of squares:</div>
        <div>
          1: {squares[0].value}, 2: {squares[1].value}, 3: {squares[2].value},
          4: {squares[3].value}, 5: {squares[4].value}, 6: {squares[5].value},
          7: {squares[6].value}, 8: {squares[7].value}, 9: {squares[8].value},
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div>
        <h1>Time remaining:</h1>
        <>
          <h1>{counter != null ? counter : length}</h1>
        </>
        <>
          <StartButton />
        </>
        <>
          <PauseButton />
        </>
        <br />
        <br />
        <>
          <div className="board-row">
            <Square value={terns(0)} onSquareClick={() => handleClick(0)} />
            <Square value={terns(1)} onSquareClick={() => handleClick(1)} />
            <Square value={terns(2)} onSquareClick={() => handleClick(2)} />
          </div>
          <div className="board-row">
            <Square value={terns(3)} onSquareClick={() => handleClick(3)} />
            <Square value={terns(4)} onSquareClick={() => handleClick(4)} />
            <Square value={terns(5)} onSquareClick={() => handleClick(5)} />
          </div>
          <div className="board-row">
            <Square value={terns(6)} onSquareClick={() => handleClick(6)} />
            <Square value={terns(7)} onSquareClick={() => handleClick(7)} />
            <Square value={terns(8)} onSquareClick={() => handleClick(8)} />
          </div>
        </>
        <br />
        <LogInfo />
      </div>
    </div>
  );
}

export default App;
