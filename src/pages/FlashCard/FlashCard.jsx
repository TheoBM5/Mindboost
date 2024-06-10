import {Card, Button} from '../../components/ui/index'
import { useCards } from "../../context/CardContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react"
import './FlashCard.css'



function FlashCard() {

  const {cards, loadReviewCards} = useCards();
  const params = useParams();
  useEffect(() => {
    loadReviewCards(params.id, params.deckid);
  }, [params.id, params.deckid, loadReviewCards]); 
  

  return (
    <div className='card-size'>
    <div className='content'>
      {cards.length > 0 ? (
        cards.map(card => (
          <Card key={card.id} className="estiloCard">
            <p>{card.front}</p>
            <p>{card.reverse}</p>
          </Card>
        ))
      ) : (
        <p>No cards available</p>
      )}
      <div className='line-buttons'>
        <Button type={"button-red"}>Muy mal</Button>
        <Button type={"button-orange"}>Mal</Button>
        <Button type={"button-yellow"}>Bien</Button>
        <Button type={"button-green"}>Muy Bien</Button>
      </div>
    </div>
  </div>
  )
}
export default FlashCard