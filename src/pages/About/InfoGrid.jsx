import React, { useState } from 'react';
import { CiApple,
    CiPen,
    CiClock2,
    CiSettings} from 'react-icons/ci';

import './About.css'
function InfoGrid() {
    const [activeTitle, setActiveTitle] = useState(0);
    const handleSelectInfo = (section) =>{
        setActiveTitle(section);

    }
    const modes = [
        { id: "0", label: "Apuntes Sub", img: `/img/flashw.webp`},
        { id: "1", label: "Tiempo Sub", img: `/img/trofeo.webp` },
        { id: "2", label: "Metodo sub", img: `/img/cronometro.webp` },
        { id: "3", label: "Rubber Duck" },
      ];



  return (
    <div className='prueba-color'>
        <img className="colors-infogrid" src='/img/background/colors.webp'/>
    <div className='panel-information1'>
        
        <p className='info-title'>Elementos Clave para <span className='title-section-about'>Estudiar</span></p>
        <div className={`info-1 info-stlye ${activeTitle === 0 ? "info-stlye-active" : ""}`} onClick={() => handleSelectInfo(0)}>
            <h3 className="title-infogrid">Apuntes</h3>
            <div className='cont-img-infogrid'>
                <CiPen className='icon-panel-information'/>
            </div>
            <p className="description-infogrid">Organiza la información clave para un repaso rápido y eficaz</p>
            {activeTitle === 0 ? (
                    <span className='sub-mainfo'>Mas informacion</span>
                ) : null
            }
        </div>
        <div className={`info-2 info-stlye ${activeTitle === 1 ? "info-stlye-active" : ""}`} onClick={() => handleSelectInfo(1)}>
            <h3 className="title-infogrid">Tiempo</h3>
            <div className='cont-img-infogrid'>
                <CiClock2 className='icon-panel-information'/>
            </div>
            <p className="description-infogrid">Planifica tu tiempo para estudiar sin estrés ni distracciones</p>
            {activeTitle === 1 ? (
                    <span  className='sub-mainfo'>Mas informacion</span>
                ) : null
            }
        </div>
        <div className={`info-3 info-stlye ${activeTitle === 2 ? "info-stlye-active" : ""}`} onClick={() => handleSelectInfo(2)}>
            <h3 className="title-infogrid">Metodo</h3>
            <div className='cont-img-infogrid'>
                <CiSettings className='icon-panel-information' />
            </div>
            <p className="description-infogrid">Usa técnicas personalizadas para aprender de forma más eficiente</p>
            {activeTitle === 2 ? (
                    <span className='sub-mainfo'>Mas informacion</span>
                ) : null
            }
        </div>
        {/* <div className='card-extra-info info-g'>
            <p>{modes[activeTitle].label}</p>
        </div> */}
    </div>
    </div>
  )
}
export default InfoGrid