import Reloj from "../../components/Reloj/Reloj";
import React, { useState } from 'react';
import './Pomodoro.css'
function Pomodoro() {
  const [timeClock, setTimeClock] = useState(0);


  const handleTimeEnd = () =>{

  }

  const handleTimeStart = () =>{

  }

  const handleTimeSelection = (time) => {
    setTimeClock(time * 60 * 1000);
}

  return (
  
    <div className="pomodoro-container">
      <Reloj tipo={2} initialTime={timeClock} onTimeEnd={handleTimeEnd} onTimeStart={handleTimeStart} size="650px"/>
      <footer>
        <button onClick={() => handleTimeSelection(25)}>25</button>
        <button onClick={() => handleTimeSelection(40)}>40</button>
        <button onClick={() => handleTimeSelection(60)}>60</button>
      </footer>
    <div className="effect-background-clock">
    </div>

    </div>
  )
}
export default Pomodoro