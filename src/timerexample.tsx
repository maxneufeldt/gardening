countdown = setInterval(() => {
  // That's how I resume it (with a re-render)
  if (!paused) {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0 || pause) {
      clearInterval(countdown); // That's how I pause it (by clearing the interval)
      return;
    }
    displayTimeLeft(secondsLeft);
  }
}, 1000);


function App() {
    const [counter, setCounter] = useState(null); // trying -1 instead of null
    const [pause, setPause] = useState(false);
    //const length = 60;
  
    useEffect(() => {
      let timer = setInterval(() => {
        if (counter > 0) {
          if (!pause) {
            setCounter(counter - 1);
          }
        }
      }, 1000);
      return () => clearInterval(timer);