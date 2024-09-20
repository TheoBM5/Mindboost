import React, { useState, useRef, useEffect } from 'react';
import './Reloj.css';
function Reloj2({initialTime, onTimeEnd, size}) {
    const [remainingTime, setRemainingTime] = useState(initialTime || 0); 
    const [isRunning, setIsRunning] = useState(false);
    const stopwatchRef = useRef(null);
    const secondsSphereRef = useRef(null);
    const stopwatchIntervalRef = useRef(null);

    useEffect(() => {
        setRemainingTime(initialTime);
        if (stopwatchRef.current) {
            stopwatchRef.current.textContent = calculateTime(initialTime);
            
        }
    }, [initialTime]);

    useEffect(() => {
        return () => clearInterval(stopwatchIntervalRef.current);
    }, []);

    const playPause = () => {
        
        if (!isRunning) {
            start();
        } else {
            pause();
        }
        setIsRunning(!isRunning);
    };


    const pause = () => {
        secondsSphereRef.current.style.animationPlayState = 'paused';
        clearInterval(stopwatchIntervalRef.current);
    };

    const stop = () => {
        secondsSphereRef.current.style.transform = 'rotate(-90deg) translateX(260px)';
        secondsSphereRef.current.style.animation = 'none';
        setRemainingTime(initialTime);
        clearInterval(stopwatchIntervalRef.current);
        stopwatchRef.current.textContent = '00:00';
        setIsRunning(false);
    };


    const calculateTime = (remainingTime) => {
        const total_seconds = Math.floor(remainingTime / 1000);
        const total_minutes = Math.floor(total_seconds / 60);
        const display_seconds = (total_seconds % 60).toString().padStart(2, '0');
        const display_minutes = total_minutes.toString().padStart(2, '0');
        return `${display_minutes}:${display_seconds}`;
    };

    const start = () => {
        secondsSphereRef.current.style.animation = 'rotacion2 60s linear infinite';
        let endTime = Date.now() + remainingTime;
        secondsSphereRef.current.style.animationPlayState = 'running';
        stopwatchIntervalRef.current = setInterval(() => {
            const newRemainingTime = endTime - Date.now();
            if (newRemainingTime <= 0) {
                clearInterval(stopwatchIntervalRef.current);
                setRemainingTime(0);
                stopwatchRef.current.textContent = '00:00';
                setIsRunning(false);
                onTimeEnd(); // Llama a la función cuando el tiempo llegue a cero
                console.log("termino")
                secondsSphereRef.current.style.animation = 'none'; // Detén la animación
                secondsSphereRef.current.style.transform = 'rotate(-90deg) translateX(325px)';
            } else {
                setRemainingTime(newRemainingTime);
                stopwatchRef.current.textContent = calculateTime(newRemainingTime);
            }
        }, 1000);
    };


  return (
    <main className='position-clock'  style={{ '--size': size }} >
    <div className="circle-2">
        <div id="stopwatch" className="stopwatch"  ref={stopwatchRef}>00:00</div>
        <div className="buttons-2">
            <div className="stop" onClick={stop}></div>
            <div id="play-pause" className={isRunning ? 'running' : 'paused'} onClick={playPause}></div>
        </div>
    </div>
    <div id="seconds-sphere" className="seconds-sphere-2" ref={secondsSphereRef}></div>
</main>
  )
}
export default Reloj2