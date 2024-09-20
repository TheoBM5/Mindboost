import React, { useState } from 'react';
import './Toggle.css'
function Toggle({ pressed, onPressedChange, ariaLabel }) {
  
  return (
    <button
      aria-pressed={pressed}
      aria-label={ariaLabel}
      onClick={() => onPressedChange(!pressed)}
      className={`toggle-container ${pressed ? 'bg-active' : 'bg-inactive'}`}
    >
      <div
           className={`toggle-circle ${pressed ? 'translate-right' : 'translate-left'}`}
      ></div>
    </button>
  );
}

export default Toggle;