import React, { useState } from 'react';
import './About.css'
function GeneralInfo() {
    const [hoveredTitle, setHoveredTitle] = useState(0);

  const handleMouseEnter = (section) => {
    setHoveredTitle(section);
  };
  const modes = [
    { id: "0", label: "Apuntes Sub", img: `/img/flashw.webp`},
    { id: "1", label: "Tiempo Sub", img: `/img/trofeo.webp` },
    { id: "2", label: "Metodo sub", img: `/img/cronometro.webp` },
    { id: "3", label: "Rubber Duck" },
  ];

  return (
    <div className='panel-detail-information'>
            <div onMouseEnter={() => handleMouseEnter(0)}>
                <h3 className='info-detail-1'>Apuntes</h3>
            </div>
            <div onMouseEnter={() => handleMouseEnter(1)}>
                <h3 className='info-detail-2'>Tiempo</h3>
            </div>
            <div onMouseEnter={() => handleMouseEnter(2)}>
                <h3 className='info-detail-3'>Metodo</h3>
            </div>
            <p className='info-img'>{modes[hoveredTitle].label}</p>
          </div>
  )
}
export default GeneralInfo