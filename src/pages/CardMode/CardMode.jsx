import {Card, Button} from '../../components/ui/index'
import React, { useState, useRef } from 'react';
import "./CardMode.css"
function CardMode() {
  const [selectedCard, setSelectedCard] = useState(null);
  const handleContainerClick = (cardId) => {
    setSelectedCard(cardId);
  };
  return (
    <>
      <article className="tile-content-mode">
        <div className="tile-mode" onClick={() => handleContainerClick("card1")}>
          <div className="radio-select">
            <input type="radio" name="card" id="card1"
              checked={selectedCard === "card1"}
              onChange={() => {}}
            />
          </div>
          <div className="PruebaAnimation"></div>
          <label htmlFor="card1">
            <h6 className='title-card-create'>Normal</h6>
          </label>
        </div>
        <div className="tile-mode" onClick={() => handleContainerClick("card2")}>
          <div className="radio-select">
            <input type="radio" name="card" id="card2"
              checked={selectedCard === "card2"}
              onChange={() => {}}
            />
          </div>
          <div className="PruebaAnimation"></div>
          <label htmlFor="card2">
            <h6 className='title-card-create'>Logro/Trofeo</h6>
          </label>
        </div>
        <div className="tile-mode" onClick={() => handleContainerClick("card3")}>
          <div className="radio-select">
            <input type="radio" name="card" id="card3"
              checked={selectedCard === "card3"}
              onChange={() => {}}
            />
          </div>
          <div className="PruebaAnimation"></div>
          <label htmlFor="card3">
            <h6 className='title-card-create'>Cronometro</h6>
          </label>
        </div>
      </article>
      <footer className='buttons-confirm'>
        <Button>Cancelar</Button>
        <Button>Confirmar</Button>
      </footer>
    </>
  )
}
export default CardMode