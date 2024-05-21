import { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(new Date());
  const [pause, setPause] = useState(false);

  function pauseHandler() {
    setPause(!pause);
  }

  useEffect(() => {
    let timer = setInterval(() => {
      if (!pause) {
        let t = time.setSeconds(time.getSeconds() + 1);
        setTime(new Date(t));
      }
    }, 1 * 1000);
    return () => clearInterval(timer);
  }, [pause]);

  return (
    <div className="m-2 p-2 flex">
      <h1 className="m-1 p-1">{time.toLocaleTimeString()}</h1>
      <button
        className="m-1 p-2 bg-slate-200 rounded-lg shadow-lg font-semibold"
        onClick={() => pauseHandler()}
      >
        {pause ? "Start" : "Pause"}
      </button>
    </div>
  );
}

export default App;
