import React, { useState, useRef, useEffect } from 'react';
import './Reloj.css';



function Reloj2({initialTime, initialRestTime, isRunningHandle, onTimeEnd, size, className}) {
    const [time, setTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);
    const stopwatchRef = useRef(null);

    const formatTime = (time) => {
        const minutes = String(Math.floor(time / 60)).padStart(2, '0');
        console.log(minutes)
      const seconds = String(time % 60).padStart(2, '0');
      return `${minutes}:${seconds}`;
    };
  
    const playPause = () => {
      if (isRunning) {
        clearInterval(intervalRef.current);
      } else {
        intervalRef.current = setInterval(() => {
          setTime((prevTime) => {
            if (prevTime > 0) {
              return prevTime - 1;
            } else {
              clearInterval(intervalRef.current);
              setIsRunning(false);
              if (onTimeEnd) onTimeEnd(); 
              return 0;
            }
          });
        }, 1000);
      }
      setIsRunning(!isRunning);
    };
  
    const stop = () => {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      setTime(initialTime);
    };
  
    useEffect(() => {
      if (stopwatchRef.current) {
        stopwatchRef.current.innerText = formatTime(time);
      }
    }, [time]);
  
    useEffect(() => {
      return () => clearInterval(intervalRef.current);
    }, []);
  
    const percentage = ((initialTime - time) / initialTime) * 360;

  return (
    <main className={`${className}`}   style={{ '--size': size }} >
    <div className="circle-3" style={{
        '--size': size,
        background: `conic-gradient(rgb(119, 119, 255) ${percentage}deg, white 0deg)`,
      }}>
        <div id="stopwatch" className="stopwatch-2"  ref={stopwatchRef}>00:00</div>
        <div className="buttons-3">
            <div className="stop2" onClick={stop}></div>
            <div id="play-pause2" className={isRunning ? 'running2' : 'paused2'} onClick={playPause}></div>
        </div>
       
    </div>
    </main>

  )
}
export default Reloj2