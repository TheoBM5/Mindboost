import React, { useState, useRef, useEffect } from 'react';
import './Reloj.css';

function Reloj({ tipo, initialTime, onTimeEnd, onTimeStart, size }) {
    const [remainingTime, setRemainingTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    const stopwatchRef = useRef(null);
    const playPauseButtonRef = useRef(null);
    const secondsSphereRef = useRef(null);
    const stopwatchIntervalRef = useRef(null);

    useEffect(() => {
        setRemainingTime(initialTime);
        if (stopwatchRef.current) {
            stopwatchRef.current.textContent = calculateTime(initialTime);
        }
    }, [initialTime]);

    const playPause = () => {
        if (!isRunning) {
            playPauseButtonRef.current.classList.add('running');
            start();
        }
        else if (tipo != 1){
            playPauseButtonRef.current.classList.remove('running');
            pause();
        }
   
        setIsRunning(!isRunning);
    };

    const pause = () => {
        secondsSphereRef.current.style.animationPlayState = 'paused';
        clearInterval(stopwatchIntervalRef.current);
    };

    const stop = () => {
        if(tipo===1){
            secondsSphereRef.current.style.transform = 'rotate(-90deg) translateX(60px)';
        }
        else{
            secondsSphereRef.current.style.transform = 'rotate(-90deg) translateX(325px)';
        }
        secondsSphereRef.current.style.animation = 'none';
        playPauseButtonRef.current.classList.remove('running');
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
        if(tipo === 1){
            secondsSphereRef.current.style.animation = 'rotacion 60s linear infinite';
        }
        else{
            secondsSphereRef.current.style.animation = 'rotacion2 60s linear infinite';
        }
        let endTime = Date.now() + remainingTime;
        onTimeStart();
        secondsSphereRef.current.style.animationPlayState = 'running';
        stopwatchIntervalRef.current = setInterval(() => {
            const newRemainingTime = endTime - Date.now();
            if (newRemainingTime <= 0) {
                clearInterval(stopwatchIntervalRef.current);
                setRemainingTime(0);
                stopwatchRef.current.textContent = '00:00';
                if(tipo !== 1){
                    playPauseButtonRef.current.classList.remove('running');
                }
                setIsRunning(false);
                onTimeEnd(); // Llama a la función cuando el tiempo llegue a cero
                secondsSphereRef.current.style.animation = 'none'; // Detén la animación
                if(tipo === 1){
                    secondsSphereRef.current.style.transform = 'rotate(-90deg) translateX(60px)';
                }
                else{
                    secondsSphereRef.current.style.transform = 'rotate(-90deg) translateX(325px)';
                    
                }
            } else {
                setRemainingTime(newRemainingTime);
                stopwatchRef.current.textContent = calculateTime(newRemainingTime);
            }
        }, 1000);
    };

    return (
        <main className='position-clock'  style={{ '--size': size }} >
            <div className={`${tipo === 1 ? 'circle' : 'circle2'}`}>
                <div id="stopwatch" className="stopwatch"  ref={stopwatchRef}>00:00</div>
                <div className={`${tipo === 1 ? 'buttons' : 'buttons-g-clock'}`}>
                    {tipo !== 1 ? (
                        <>
                            {!isRunning && (
                                <div id="play-pause" className='paused2' ref={playPauseButtonRef} onClick={playPause}></div>
                            )}
                            <div className='stop2' onClick={stop}></div>
                        </>
                    ) : (
                        !isRunning && (
                            <div id="play-pause" className='paused' ref={playPauseButtonRef} onClick={playPause}></div>
                        ) 
                    )}
                </div>
            </div>
            <div id="seconds-sphere" className={`${tipo === 1 ? 'seconds-sphere' : 'seconds-sphere-g-clock'}`} ref={secondsSphereRef}></div>
        </main>
    );
}

export default Reloj;