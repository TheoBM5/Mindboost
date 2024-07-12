import { Navigate } from "react-router-dom";
import { Link, NavLink } from 'react-router-dom'
import "./ModalCard.css"
import { useNavigate } from 'react-router-dom'
import React, { useState, useRef } from 'react';

function ModalCard({ setModalOpen }) {
  const navigate = useNavigate();
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const [selectedCard, setSelectedCard] = useState(null);

  const handleContainerClick = (cardId) => {
    setSelectedCard(cardId);
  };

  const handleCreateClick = () => {
    if(selectedCard === "card1"){
      //navigate("deck/new/mode")
      navigate("/deck/new/modes");
    }
    else{
      navigate("/deck/new");

    }
};

  return (
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={handleModalClose}>X</button>
          </div>
          <div className="title">
            <h1>Que tipo de nota crearas?</h1>
          </div>
          <article className="tile-content">
            <div className="tile" onClick={() => handleContainerClick("card1")}>
              <div className="radio-select">
                <input type="radio" name="card" id="card1"
                  checked={selectedCard === "card1"}
                  onChange={() => {}}
                />
              </div>

              <img className="radio-img" src={"src/assets/icons/cards.svg"} alt="Card Icon" />
              <label htmlFor="card1">
                <h6>Card</h6>
              </label>
            </div>
            <div className="tile" onClick={() => handleContainerClick("card2")}>
              <div className="radio-select">
                <input type="radio" name="card" id="card2"
                  checked={selectedCard === "card2"}
                  onChange={() => {}}
                />
              </div>
              <img className="radio-img" src={"src/assets/icons/cards.svg"} alt="Card Icon" />
              <label htmlFor="card2">
                <h6>Deck</h6>
              </label>
            </div>
          </article>
          <footer className="footer">
              <button onClick={handleModalClose} id="cancelBtn">
                Cancelar
              </button>
              <button onClick={handleCreateClick}>Continue</button>
          </footer>
        </div>
      </div>
    );
}
export default ModalCard