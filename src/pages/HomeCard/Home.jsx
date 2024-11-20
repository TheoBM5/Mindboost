import { useEffect } from "react"
import CardsContent from "../../components/Cards/CardsContent";
import {useState} from 'react';
import {useDecks} from '../../context/DeckContext';
import { SquarePlus } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom'
import './Home.css';

import NavbarLeft from "../../components/Navbarleft/NavbarLeft";
function Home() {
  const { decks, loadDecks, getDeckReview } = useDecks();
  const [reviewDecks, setReviewDecks] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Cargar los decks y las revisiones de los decks
    loadDecks();
    getDeckReview().then((reviewDecksData) => {
      const reviewDeckIds = reviewDecksData.map((deck) => deck.deck_id);
      setReviewDecks(reviewDeckIds);
    });
  }, [location]); // Dependemos de location para actualizar cuando cambie la ruta

  useEffect(() => {
    // Este useEffect asegura que si 'decks' cambia, recargamos la información de las revisiones
    getDeckReview().then((reviewDecksData) => {
      const reviewDeckIds = reviewDecksData.map((deck) => deck.deck_id);
      setReviewDecks(reviewDeckIds);
    });
  }, [decks]); 

  if (decks.length === 0) return (
    <div className="box">
    <NavbarLeft className="nav-bar-left"/>
    <div className="cont-no-decks">
      <h1 className="text-no-deck">No hay decks que Estudiar</h1>
      <div className="nuevo-deck-no" onClick={() => navigate("/deck/new")}>
        <label>Nuevo Deck</label>
        <SquarePlus />
      </div>
      <img className="img-no-deck" src="/img/planetass.webp"/>
    </div>
    </div>
  )
  
  return (
    <div className="box">
      <NavbarLeft className="nav-bar-left"/>
      <div className="deck-space">
        {decks.map((deck) => (
          <CardsContent key={deck.id} deck={deck} 
          className={reviewDecks.includes(deck.id) ? "borde-1" : "borde-2"}
        />
      ))}
      </div>
    </div>

  )
}
export default Home