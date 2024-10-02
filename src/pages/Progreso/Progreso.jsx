import { useEffect } from "react"
import CardsContent from "../../components/Cards/CardsContent";
import CardsProgreso from "../../components/Cards/CardsProgreso";
import {useState} from 'react';
import {useDecks} from '../../context/DeckContext';
import NavbarLeft from "../../components/Navbarleft/NavbarLeft"
function Progreso() {
  const {decks, loadDecks, getDeckReview} = useDecks();
  const [reviewDecks, setReviewDecks] = useState([]);

  
  useEffect(() => {
    loadDecks();
    getDeckReview().then((reviewDecksData) => {
      const reviewDeckIds = reviewDecksData.map((deck) => deck.deck_id);
      setReviewDecks(reviewDeckIds);
    });
  }, []);

  if (decks.length === 0) return (
    <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
      <NavbarLeft/>
      <h1 className="text-3xl font-bold">No decks found</h1>
      <h2>hola</h2>
    </div>
  )
  return (
    <div className="box">
      <NavbarLeft/>
      <div className="deck-space">
        {decks.map((deck) => (
          <CardsProgreso key={deck.id} deck={deck} 
        
        />
      ))}
      </div>
    </div>

  )
}
export default Progreso