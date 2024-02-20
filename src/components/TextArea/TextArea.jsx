import {forwardRef} from "react";
import './TextArea.css'

export const TextArea = forwardRef ((props, ref) => {
  return (
    <textarea 
      className="fieldInput" 
      ref={ref} 
      {...props}
    >
        {props.childrem}
    </textarea>
  );
});
export default TextArea