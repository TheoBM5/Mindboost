import React, { useState, useEffect } from 'react';
import './Tutorial.css'

const Tutorial = ({ steps, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
  
    useEffect(() => {
      const element = document.querySelector(steps[currentStep].selector);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
        <div className="tutorial-modal" style={{
          position: 'absolute',
          top: `${document.querySelector(steps[currentStep].selector)?.getBoundingClientRect().top + window.scrollY}px`,
          left: `${document.querySelector(steps[currentStep].selector)?.getBoundingClientRect().left}px`
        }}>
          <h3>{steps[currentStep].title}</h3>
          <p>{steps[currentStep].message}</p>
          <button onClick={nextStep}>Siguiente</button>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    );
  };
export default Tutorial