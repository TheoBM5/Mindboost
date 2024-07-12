import {Card, Button} from '../../components/ui/index'
import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./CardMode.css"
function CardMode() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const params = useParams();
  
  const navigate = useNavigate();
  const modes = [
    { id: "card1", label: "Normal" },
    { id: "card2", label: "Logro/Trofeo" },
    { id: "card3", label: "Cronometro" },
    { id: "card4", label: "Rubber Duck" },
    { id: "card5", label: "Canva" },
  ];

  const modesPerPage = 3;
  const totalPages = Math.ceil(modes.length / modesPerPage);

  const handleContainerClick = (cardId) => {
    setSelectedCard(cardId);
  };

  const handleCancelar = () =>{
    navigate("/")
  }

  const handleConfirm = () =>{
      if(selectedCard == "card1"){
        navigate(`/deck/${params.id}/${params.deckid}/new/card`);
  
      }
      if(selectedCard == "card2"){
        navigate(`/deck/${params.id}/${params.deckid}/achievement`);
      }
      if(selectedCard == "card3"){
        navigate(`/deck/${params.id}/${params.deckid}/clock`);
      }
      if(selectedCard == "card4"){
        navigate(`/deck/${deck.user_id}/${deck.id}/duck`);
      }
      if(selectedCard == "card5"){

      }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = currentPage * modesPerPage;
  const endIndex = startIndex + modesPerPage;
  const currentModes = modes.slice(startIndex, endIndex);

  return (
    <>
      <article className="tile-content-mode">
        {currentModes.map((mode) => (
          <div htmlFor={mode.id}
          key={mode.id}
          className={`tile-mode ${selectedCard === mode.id ? 'selected' : ''}`}
          onClick={() => handleContainerClick(mode.id)}>
            <div>
              <input
                className='radio-mode'
                type="radio"
                name="card"
                id={mode.id}
                checked={selectedCard === mode.id}
                onChange={() => {}}
              />
            </div>
            <div className="PruebaAnimation"></div>
            <label htmlFor={mode.id}>
              {mode.label}
            </label>
          </div>
        ))}
      </article>
      <footer className="buttons-confirm">
      {currentPage !== 0 &&(
        <Button className="prev-mode" onClick={handlePrevPage}>
          Anterior
        </Button>
        )
      }
      <div className='buttons-confirm-mode'>
        <Button onClick={handleCancelar}>Cancelar</Button>
        <Button onClick={handleConfirm}>Confirmar</Button>
      </div>
        {currentPage !== totalPages - 1 &&(
        <Button className="next-mode" onClick={handleNextPage}>
          Siguiente
        </Button>
        )}
      </footer>
    </>
  );
}
export default CardMode