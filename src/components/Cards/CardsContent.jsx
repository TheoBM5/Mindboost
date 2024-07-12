import {Card, Button} from '../ui/index'
import { useDecks } from '../../context/DeckContext'
import { useNavigate } from 'react-router-dom'
import "./CardsContent.css"
import React, { useState, useEffect, useRef  } from 'react';
import { ICON_NAMES } from "../../constants/icon"; 
function CardsContent({deck, className}) {
    const {deleteDeck} = useDecks();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const menuRef = useRef();
    const menuMode = useRef();
    console.log(className)
  

    const handleAddClick = (event) => {
      event.stopPropagation();
      setIsOpen2(!isOpen2);
      //navigate(`/deck/${deck.user_id}/${deck.id}/new/card`);
  };

  const handleNewCard = (event) => {
    event.stopPropagation();
    navigate(`/deck/${deck.user_id}/${deck.id}/new/card`);
  }
  const handleNewClock = (event) => {
    event.stopPropagation();
    navigate(`/deck/${deck.user_id}/${deck.id}/clock`);
  }  
  const handleNewAchievement = (event) => {
    event.stopPropagation();
    navigate(`/deck/${deck.user_id}/${deck.id}/achievement`);
  }
  const handleNewRubberduck = (event) => {
    event.stopPropagation();
    navigate(`/deck/${deck.user_id}/${deck.id}/duck`);
  }  

  const handleNewCanva = (event) => {
    event.stopPropagation();

  }

  const handleMoreDetails = (event) => {
    event.stopPropagation();
    navigate(`/deck/${deck.user_id}/${deck.id}/new/modes`);
  }  

  const handleButtonClick = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleClickCard = () => {
    navigate(`/study/${deck.user_id}/${deck.id}`);
  }

  const handleEditClickDeck = (event) => {
    event.stopPropagation();
    navigate(`/decks/${deck.id}/edit`);
  };
  const handleEditClick = (event) => {
      //navigate(`/decks/${deck.id}/edit`);
      event.stopPropagation();
      navigate(`/decks/${deck.id}/card/edit`);
  };

  const handleDeleteClick = async (event) => {
    event.stopPropagation();
      if (window.confirm("¿Estás seguro de eliminar esta tarea?")) {
          deleteDeck(deck.id);
      }
  };
  
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
    if (menuMode.current && !menuMode.current.contains(event.target)){
      setIsOpen2(false);
    }
  };


  const [selectedIcon, setSelectedIcon] = useState('');

  useEffect(() => {
    setSelectedIcon(deck.icon_name);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
}, [deck.icon_name]);
  
  return (
    <div className={`Tarjeta ${className}`} key={deck.id} onClick={handleClickCard}>
        <div className="card-image item-3" >
          {selectedIcon && React.createElement(ICON_NAMES[selectedIcon], {className: "card-image"})}
        </div>
        <h1 className="title-card item-1">{deck.title}</h1>
        <p className='item-2'>{deck.description}</p>
        <div className='deck-buttons item-4'>
          <button onClick={handleAddClick} className='add-card-button'>+</button>
           {isOpen2 &&(
            <button
              className='menu'
              style={{left: "6rem"}}
              ref={menuMode}
            >
              <div className='menu-item' onClick={handleNewCard}>Tarjeta Clasica</div>
              <div className='menu-item' onClick={handleNewClock}>Cronometro</div>
              <div className='menu-item' onClick={handleNewAchievement}>Logro</div>
              <div className='menu-item' onClick={handleNewRubberduck}>Rubeer Duck</div>
              <div className='menu-item' onClick={handleAddClick}>Canva</div>
              <div className='menu-item' onClick={handleMoreDetails}>Detalles</div>
            </button>
          )}

          
          <Button>Estudiar</Button>
                  <button className="menu-button" onClick={handleButtonClick}>
                    ⋮
                  </button>
                  {isOpen && (
                    <button className="menu" ref={menuRef}>
                      <div className="menu-item" onClick={handleEditClickDeck}>Editar deck</div>
                      <div className="menu-item" onClick={handleEditClick}>Editar card</div>
                      <div className="menu-item" onClick={handleDeleteClick}>Eliminar</div>
                    </button>
                  )}
        </div>
    </div>
  )
}
export default CardsContent