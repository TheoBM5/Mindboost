import React from "react";
import './Modal.css';

function Modal({children, className }) {
  return (
    <div className="fondo-modal">
        <main className="card-modal">
            {children}
        </main>
    </div>
  )
}
export default Modal