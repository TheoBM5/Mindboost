import React from "react";
import './Modal.css';

function Modal({children, className }) {
  return (
    <div className="fondo-modal">
        <main className={`card-modal ${className}`}>
            {children}
        </main>
    </div>
  )
}
export default Modal