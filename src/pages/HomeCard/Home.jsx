import { useEffect } from "react"
import CardsContent from "../../components/Cards/CardsContent";
import {useState} from 'react'
import {useDecks} from '../../context/DeckContext'
import './Home.css'
function Home() {
  const {decks, loadDecks} = useDecks();
  
  useEffect(()=>{
      loadDecks()
  }, []);

  if (decks.length === 0) return (
    <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
      <h1 className="text-3xl font-bold">No decks found</h1>
    </div>
  )
  
  return (
    <div className="box">
      <div className="deck-space">
        {decks.map((deck) => (
          <CardsContent key={deck.id} deck={deck}/>
        ))}
      </div>
    </div>

  )
}
export default Home