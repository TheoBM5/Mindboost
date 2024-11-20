import React, { useState, useEffect, useRef } from 'react';
import './Tutorial.css'

const Tutorial = ({ steps, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const modalRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const element = document.querySelector(steps[currentStep].selector);
    if (element) {
      const rect = element.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let top = rect.top + window.scrollY;
      let left = rect.left;

      if (top + modalRef.current.offsetHeight > windowHeight) {
        top = windowHeight - modalRef.current.offsetHeight - 10; 
      }
      if (left + modalRef.current.offsetWidth > windowWidth) {
        left = windowWidth - modalRef.current.offsetWidth - 10;
      }

      setPosition({ top, left });
    }
  }, [currentStep, steps]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="tutorial-overlay">
      <div
        ref={modalRef}
        className="tutorial-modal"
        style={{
          position: 'absolute',
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        <h3>{steps[currentStep].title}</h3>
        <p>{steps[currentStep].message}</p>
        <button onClick={nextStep}>Siguiente</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Tutorial;