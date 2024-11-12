import './ChatDuck.css';
import {Card, Input, Label} from '../../components/ui/index';
function ChatDuck({ text = '', isEditable = false, imageSrc = 'default-image-url.png', onTextChange, className, classNameBubble }) {

  return (
    <div className={`card-chat-duck ${className}`}>
      <div 
        className="chat-icon-duck" 
        style={{ backgroundImage: `url(${imageSrc})` }}
      ></div>
      <textarea 
        className={`question-bubble ${classNameBubble} `}
        value={text} 
        disabled={!isEditable} 
        onChange={isEditable ? onTextChange : undefined}
      />
    </div>
  );
}
export default ChatDuck