import React from 'react';
export function Buton ({ label, onClick, className }) {
    return (
      <button onClick={onClick} className={className}>
        {label}
      </button>
    );
  };

  export default Buton;