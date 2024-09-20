import Reloj2 from "../../components/Reloj/Reloj2";
import {Input, TextArea, Label} from "../../components/ui/index";
import React, { useState, useEffect, useRef } from 'react';
import {CiAlarmOn, CiViewTable, CiDark } from "react-icons/ci";

import './Pomodoro.css'
function Pomodoro() {
  const [timeClock, setTimeClock] = useState(1500000);
  const [selectButton, setSelectButton] = useState(0);
  const [timeSelect, setTimeSelect] = useState(25);
  const [restSelect, setRestSelect] = useState(5);
  const [isResting, setIsResting] = useState(false);
  const [restCount, setRestCount] = useState(0); 

  const handleTimeSelection = (time) => {
    setTimeClock(time * 60 * 1000);
    setTimeSelect(time); 
}

const handleRestSelection = (time) => {
  setRestSelect(time);
};

  const handleButtonSelect = (button) =>{
    setSelectButton(button)
  }

  const handleButtonTime = (time) => {
    if (selectButton === 1) {
      setTimeSelect(time); 
    } else if (selectButton === 2) {
      setRestSelect(time); 
    }
  };

  const alarmAudio = useRef(new Audio('/sounds/sound1.mp3')); // Ruta relativa desde public

  // Función que reproduce el sonido
  const playAlarm = () => {
    alarmAudio.current.play();
  };

  const handleTimeEnd = () => {
    playAlarm();
    if (isResting) {
        setTimeClock(timeSelect * 60 * 1000);
        setIsResting(false); 
    } else {
        if (restCount === 2) {
            setTimeClock(restSelect * 2 * 60 * 1000); 
            setRestCount(0);
        } else {
            const restTimeMs = restSelect * 60 * 1000;
            setTimeClock(restTimeMs > 0 ? restTimeMs : 10000); 
            setIsResting(true);
            setRestCount((prevCount) => prevCount + 1);
        }
    }
};

const handleInputChange = (e) => {
  const newTime = parseInt(e.target.value, 10);
  if (!isNaN(newTime)) {
    if (selectButton === 1) {
      setTimeSelect(newTime); // Actualizar tiempo de trabajo
      if (!isResting) setTimeClock(newTime * 60 * 1000); // Solo si no está descansando
    } else if (selectButton === 2) {
      setRestSelect(newTime); // Actualizar tiempo de descanso
      if (isResting) setTimeClock(newTime * 60 * 1000); // Solo si está descansando
    }
  }
};

  useEffect(() => {
    if (isResting) {
        setTimeClock(restSelect * 60 * 1000);
    } else {
        setTimeClock(timeSelect * 60 * 1000);
    }
}, [timeSelect, restSelect, isResting]);

useEffect(() => {
  try {
    const savedWorkTime = localStorage.getItem('workTime');
    const savedRestTime = localStorage.getItem('restTime');
    if (savedWorkTime) setTimeSelect(parseInt(savedWorkTime, 10));
    if (savedRestTime) setRestSelect(parseInt(savedRestTime, 10));
  } catch (error) {
    console.error("Error retrieving data from localStorage", error);
  }
}, []);

useEffect(() => {
  try {
    localStorage.setItem('workTime', timeSelect);
    localStorage.setItem('restTime', restSelect);
  } catch (error) {
    console.error("Error saving data to localStorage", error);
  }
}, [timeSelect, restSelect]);

  return (
  
    <div className="pomodoro-container">
      <Reloj2 initialTime={timeClock} onTimeEnd={handleTimeEnd} key={timeClock} size="650px"/>
      {selectButton === 1 ? (
        <div className="sub-cont-button-grid">
          <Label>Tiempo</Label>
            <Input className="input-pomodoro" value={timeSelect} onChange={handleInputChange}  />
            <div className="buttons-minutes-pre">
              <button onClick={() => handleButtonTime(15)}>15</button>
              <button onClick={() => handleButtonTime(20)}>20</button>
              <button onClick={() => handleButtonTime(25)}>25</button>
            </div>
          <button className="button-pomodoro pomodoro-acept" type="submit" onClick={() => handleTimeSelection(timeSelect)}>✔</button>
          <button className="button-pomodoro pomodoro-cancel" onClick={() => handleButtonSelect(0)}>x</button>
        </div>
      ) : selectButton === 2 ? (
        <div className="sub-cont-button-grid">
          <Label>Descanso</Label>
          <Input className="input-pomodoro" value={restSelect} onChange={handleInputChange}  />
          <div className="buttons-minutes-pre">
              <button onClick={() => handleButtonTime(15)}>15</button>
              <button onClick={() => handleButtonTime(20)}>20</button>
              <button onClick={() => handleButtonTime(25)}>25</button>
            </div>
          <button className="button-pomodoro pomodoro-acept" type="submit" onClick={() => handleRestSelection(restSelect)}>✔</button>
          <button className="button-pomodoro pomodoro-cancel" onClick={() => handleButtonSelect(0)}>x</button>
        </div>
      ) : selectButton === 3 ? (
        <button className="button-pomodoro" onClick={() => handleButtonSelect(0)}>60</button>
      ):(
        <footer className="pomodoro-buttons">
          <button className="button-pomodoro" onClick={() => handleButtonSelect(1)}><CiAlarmOn /></button>
          <button className="button-pomodoro" onClick={() => handleButtonSelect(2)}><CiDark /></button>
          <button className="button-pomodoro" onClick={() => handleButtonSelect(3)}><CiViewTable/></button>
        </footer>
      )}
      
    <div className="effect-background-clock">
    </div>

    </div>
  )
}
export default Pomodoro