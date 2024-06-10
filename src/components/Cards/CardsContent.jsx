import {Card, Button} from '../ui/index'
import { useDecks } from '../../context/DeckContext'
import { useNavigate } from 'react-router-dom'
import "./CardsContent.css"
import React, { useState, useEffect, useRef  } from 'react';
import { ICON_NAMES } from "../../constants/icon"; 
function CardsContent({deck}) {
    const {deleteDeck} = useDecks();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef();
  const handleAddClick = () => {
      navigate(`/deck/${deck.user_id}/${deck.id}/new/card`);
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickCard = () => {
    navigate(`/study/${deck.user_id}/${deck.id}`);
  }

  const handleEditClickDeck = () => {
    navigate(`/decks/${deck.id}/edit`);
  };
  const handleEditClick = () => {
      //navigate(`/decks/${deck.id}/edit`);
      navigate(`/decks/${deck.id}/card/edit`);
  };

  const handleDeleteClick = async () => {
      if (window.confirm("¿Estás seguro de eliminar esta tarea?")) {
          deleteDeck(deck.id);
      }
  };
  
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
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
    <div className='Tarjeta' key={deck.id} onClick={handleClickCard}>
        <div className="card-image item-3" >
          {selectedIcon && React.createElement(ICON_NAMES[selectedIcon], {className: "card-image"})}
        </div>
        <h1 className="title-card item-1">{deck.title}</h1>
        <p className='item-2'>{deck.description}</p>
        <div className='deck-buttons item-4'>
          <button onClick={handleAddClick} className='add-card-button'>+</button>
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
          
      {/* </header> */}
    </div>
  )
}
export default CardsContent