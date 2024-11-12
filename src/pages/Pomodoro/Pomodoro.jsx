import Reloj2 from "../../components/Reloj/Reloj2";
import {Input, TextArea, Label} from "../../components/ui/index";
import React, { useState, useEffect, useRef } from 'react';
import {CiAlarmOn, CiViewTable, CiDark } from "react-icons/ci";
import {ArrowLeft} from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import './Pomodoro.css'
function Pomodoro() {
  const [timeClock, setTimeClock] = useState(1500);
  const [selectButton, setSelectButton] = useState(0);
  const [timeSelect, setTimeSelect] = useState(25);
  const [restSelect, setRestSelect] = useState(5); 
  const [isResting, setIsResting] = useState(false); 
  const [cycleCount, setCycleCount] = useState(0); 
  const [isRunning, setIsRunning] = useState(false);
  const [isLongRest, setIsLongRest] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');
  const alarmAudio = useRef(new Audio('/sounds/sound1.mp3'));
  const navigate = useNavigate();
  const playAlarm = () => {
    alarmAudio.current.play();
  };


  const handleTimeSelection = (time) => {
    if (time === restSelect) {
      setErrorMessage('El tiempo de descanso y trabajo no pueden ser iguales.');
    } else {
    setTimeClock(time * 60 * 1);
    setTimeSelect(time); 
    setSelectButton(0);
    setErrorMessage('');
  }
}

const handleRestSelection = (time) => {
  if (time === timeSelect) {
    setErrorMessage('El tiempo de descanso y trabajo no pueden ser iguales.');
  } else {
  setRestSelect(time);
  setSelectButton(0);

  setErrorMessage(''); 
}
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


  const handleTimeEnd = () => {
    playAlarm();
    
    if (isResting) {
      
      setTimeClock(timeSelect * 60 * 1);  
      setIsResting(false);                    
      setCycleCount(prev => prev + 1);        
      setIsLongRest(false);                   
    } else {
      
      if (cycleCount >= 3) {                  
        setTimeClock(restSelect * 2 * 60 * 1);  
        setCycleCount(0);                      
        setIsLongRest(true);                   
      } else {
        setTimeClock(restSelect * 60 * 1);  
      }
      setIsResting(true);                      
    }
  };

const handleInputChange = (e) => {
  const newTime = parseInt(e.target.value, 10);
  if (!isNaN(newTime)) {
    if (selectButton === 1) {
      setTimeSelect(newTime); // Actualizar tiempo de trabajo
      if (!isResting) setTimeClock(newTime * 60 * 1); // Solo si no está descansando
    } else if (selectButton === 2) {
      setRestSelect(newTime); // Actualizar tiempo de descanso
      if (isResting) setTimeClock(newTime * 60 * 1); // Solo si está descansando
    }
  }
};


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

const startTimer = (play) => {
  if(play){
    setIsRunning(true); 

  }else
  {
    setIsRunning(false); 

  }
};

  return (
  
    <div className="pomodoro-container">
     <a className="regresa-pomodoro" onClick={() => navigate(`/`)}><ArrowLeft/></a>
      <Reloj2 initialTime={timeClock} initialRestTime={restSelect} isRunningHandle={startTimer} onTimeEnd={handleTimeEnd} key={timeClock} size="650px" className="reloj-style"/>

      {!isRunning && (  
      <>
         {errorMessage && <p className="error-message">{errorMessage}</p>}
        {selectButton === 1 ? (
          <div className="sub-cont-button-grid">
            <Label>Tiempo</Label>
            <Input className="input-pomodoro" value={timeSelect} onChange={handleInputChange} />
            <div className="buttons-minutes-pre">
              <button onClick={() => handleButtonTime(15)}>15</button>
              <button onClick={() => handleButtonTime(20)}>20</button>
              <button onClick={() => handleButtonTime(25)}>25</button>
            </div>
            <div className="pomodoro-acept-cancel">
              <button className="button-pomodoro pomodoro-acept" type="submit" onClick={() => handleTimeSelection(timeSelect)}>✔</button>
              <button className="button-pomodoro pomodoro-cancel" onClick={() => handleButtonSelect(0)}>x</button>
            </div>
          </div>
        ) : selectButton === 2 ? (
          <div className="sub-cont-button-grid">
            <Label>Tiempo de descanso: {restSelect}</Label>
            <Input className="input-pomodoro" value={restSelect} onChange={handleInputChange} />
            <div className="buttons-minutes-pre">
              <button onClick={() => handleButtonTime(15)}>15</button>
              <button onClick={() => handleButtonTime(20)}>20</button>
              <button onClick={() => handleButtonTime(25)}>25</button>
            </div>
            <div className="pomodoro-acept-cancel"> 
              <button className="button-pomodoro pomodoro-acept" type="submit" onClick={() => handleRestSelection(restSelect)}>✔</button>
              <button className="button-pomodoro pomodoro-cancel" onClick={() => handleButtonSelect(0)}>x</button>
            </div>
          </div>
        ) : selectButton === 3 ? (
          <button className="button-pomodoro" onClick={() => handleButtonSelect(0)}>60</button>
        ) : (
          <footer className="pomodoro-buttons">
            <button className="button-pomodoro-main" onClick={() => handleButtonSelect(1)}><CiAlarmOn className="img-button-pomodoro"/></button>
            <button className="button-pomodoro-main" onClick={() => handleButtonSelect(2)}><CiDark className="img-button-pomodoro"/></button>
            {/* <button className="button-pomodoro-main" onClick={() => handleButtonSelect(3)}><CiViewTable className="img-button-pomodoro"/></button> */}
          </footer>
        )}
      </>
    )}
      

    </div>
  )
}
export default Pomodoro