import Reloj from "../../components/Reloj/Reloj";
import './Pomodoro.css'
function Pomodoro() {
  return (
    <div className="pomodoro-container">
    
    <div>Pomodoro</div>
    <Reloj tipo={2} size="300px"/>
    </div>
  )
}
export default Pomodoro