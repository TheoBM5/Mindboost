import {forwardRef} from "react";
import './Input.css'

export const Input = forwardRef ((props, ref) => {
  return (
    <input 
      type="text" 
      className="fieldInput" 
      ref={ref} 
      {...props}
    />
  );
});
export default Input