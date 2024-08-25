import React,{forwardRef} from "react";
import './TextArea.css'

export const TextArea = forwardRef ((props, ref) => {
  const { className, ...rest } = props;
  return (
    <textarea 
      className={`text-area-comp ${className}`} 
      ref={ref} 
      {...props}
    >
        {props.childrem}
    </textarea>
  );
});
export default TextArea