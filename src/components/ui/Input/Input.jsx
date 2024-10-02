import React, {forwardRef} from "react";
import './Input.css'

export const Input = forwardRef ((props, ref) => {
  const { className = '', ...rest } = props;
  return (
    <input 
      type="text" 
      className={`fieldInput ${className}`} 
      ref={ref} 
      {...rest}
    />
  );
});
export default Input