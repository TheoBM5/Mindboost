import React, { useState, forwardRef } from "react";
import './TextArea.css';

export const TextArea = forwardRef((props, ref) => {
  const { className = "", maxLength, onChange, ...rest } = props;
  const [charCount, setCharCount] = useState(0);

  
  const handleTextChange = (e) => {
    const value = e.target.value;
    setCharCount(value.length); 
    if (onChange) onChange(e); 
  };

  return (
    <div className="text-area-wrap">
      <textarea
        className={`text-area-comp ${className}`}
        ref={ref}
        maxLength={maxLength}
        onChange={handleTextChange} 
        {...rest}
      />
      <div className={`char-counter ${charCount >= maxLength ? "max-reached" : ""}`}>
        {charCount}/{maxLength || "∞"} caracteres
      </div>
    </div>
  );
});

export default TextArea;