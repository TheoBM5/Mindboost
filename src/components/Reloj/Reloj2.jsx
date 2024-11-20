import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Square } from 'lucide-react';
import './Reloj.css';


function Reloj2({ initialTime, onTimeEnd, size, className, onTimeStart, pauseBlock, classText, sizeCircle, restriction }) {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [buttonsflex, setbuttonsflex] = useState(false);
  const intervalRef = useRef(null);
  const stopwatchRef = useRef(null);

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');

    const seconds = String(time % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const playPause = () => {
    if (restriction) {
      onTimeStart();
      setbuttonsflex(true);


    }
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

  useEffect(() => {
    console.log("buttonsflex ha cambiado:", buttonsflex);
  }, [buttonsflex]);

  const percentage = ((initialTime - time) / initialTime) * 360;

  return (
    <main className={`${className}`} style={{ '--size': size }} >
      <div className={`circle-3 ${sizeCircle}`} style={{
        '--size': size,
        background: `conic-gradient(rgb(119, 119, 255) ${percentage}deg, white 0deg)`,
      }}>
        <div id="stopwatch" className={`stopwatch-2 ${classText}`} ref={stopwatchRef}>00:00</div>
        <div className="buttons-3" style={ buttonsflex ? { display: 'none' } : {}}>
          <Square className="stop2" onClick={stop} />
          {isRunning ? (
            <Pause id="play-pause2" className="paused2" onClick={playPause} />
          ) : (
            <Play id="play-pause2" className="paused2" onClick={playPause} />
          )}
        </div>

      </div>
    </main>

  )
}
export default Reloj2