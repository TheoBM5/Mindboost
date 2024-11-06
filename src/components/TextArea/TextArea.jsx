import React, { forwardRef } from "react";
import './TextArea.css';

export const TextArea = forwardRef((props, ref) => {
  const { className = "", children, ...rest } = props;
  return (
    <textarea
      className={`text-area-comp ${className}`} 
      ref={ref} 
      {...rest} 
    >
      {children}
    </textarea>
  );
});
export default TextArea