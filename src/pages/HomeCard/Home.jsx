import { useEffect } from "react"
import CardsContent from "../../components/Cards/CardsContent";
import {useState} from 'react';
import {useDecks} from '../../context/DeckContext';
import { SquarePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import './Home.css';

import NavbarLeft from "../../components/Navbarleft/NavbarLeft";
function Home() {
  const {decks, loadDecks, getDeckReview} = useDecks();
  const [reviewDecks, setReviewDecks] = useState([]);
  const navigate = useNavigate();
  console.log("reviewdecks",reviewDecks)
  useEffect(() => {
    loadDecks();
    getDeckReview().then((reviewDecksData) => {
      const reviewDeckIds = reviewDecksData.map((deck) => deck.deck_id);
      setReviewDecks(reviewDeckIds);
    });
  }, []);

  if (decks.length === 0) return (
    <div className="box">
    <NavbarLeft className="nav-bar-left"/>
    <div className="cont-no-decks">
      <h1 className="text-no-deck">No decks found</h1>
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