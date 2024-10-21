import './ChatDuck.css';
import {Card, Input, Label} from '../../components/ui/index';
function ChatDuck({text}) {
  return (
    <div className='card-chat-duck'>
        <div className='chat-icon-duck'></div>
        <Input className="question-bubble" value={text} disabled />
    </div>
  )
}
export default ChatDuck