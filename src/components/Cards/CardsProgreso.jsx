import {Card, Button} from '../ui/index'
import { useDecks } from '../../context/DeckContext'
import { useNavigate } from 'react-router-dom'
import "./CardsContent.css"
import React, { useState, useEffect, useRef  } from 'react';
import { ICON_NAMES } from "../../constants/icon"; 

const cardValue = {
    1: 35,
    2: 25,
    3: 35,
    4: 15,
    5: 5,

}

function CardsProgreso({deck, className}) {
    const {deleteDeck} = useDecks();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const menuRef = useRef();
    const menuMode = useRef();  
    const [selectedIcon, setSelectedIcon] = useState('');

    useEffect(() => {
        setSelectedIcon(deck.icon_name);
        // document.addEventListener('mousedown', handleClickOutside);
        return () => {
        //   document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [deck.icon_name]);

  return (
    <div className={`Tarjeta ${className}`} key={deck.id}>
    <div className="card-image item-3" >
      {selectedIcon && React.createElement(ICON_NAMES[selectedIcon], {className: "card-image"})}
    </div>
    <h1 className="title-card item-1">{deck.title}</h1>
    

    <div className="progress-bar-container">
    <div 
                    className="progress-bar" 
                    style={{ width: `${cardValue[deck.id] || 0}%` }}  // Asegura que cardValue tenga un valor
                ></div>
</div>


</div>
  )
}
export default CardsProgreso