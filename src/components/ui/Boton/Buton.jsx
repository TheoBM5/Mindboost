import React from 'react';
const Buton= ({ label, onClick, className }) => {
    return (
      <button onClick={onClick} className={className}>
        {label}
      </button>
    );
  };

  export default Buton;