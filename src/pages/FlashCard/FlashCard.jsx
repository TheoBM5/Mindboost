import { Card, Button } from '../../components/ui/index';
import { useCards } from "../../context/CardContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './FlashCard.css';



function FlashCard() {
  const { cards, loadReviewCards, updateReviewCards } = useCards();
  const params = useParams();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const navigate = useNavigate();

  function addDaysToDate(fecha, days) {
    const date = new Date(fecha);
    date.setDate(date.getDate() + days);
    return date.toISOString();
  }

  function sm2 (q, racha, interval_repeat, ef, fecha)
  {
    const fechaActual = new Date();
    const diffDays = Math.floor((new Date(fechaActual) - new Date(fecha)) / (1000 * 60 * 60 * 24));
    if (q>=2)
    {
      if (racha == 0){
        interval_repeat=1;
      }
      else if (racha == 1){
        interval_repeat=6;
      }
      else{
        interval_repeat=Math.round(interval_repeat*ef);
      }
      racha+=1;
    }
    else{
      racha = 0;
      interval_repeat = 0;
    }

    ef = ef+(0.1-(4-q) * (0.08 + (4-q) * 0.02))
    if (ef<1.3){
      ef = 1.3;
    }
    if (diffDays > interval_repeat) {
      const penaltyFactor = 1.1; // Factor de penalización, puedes ajustarlo según necesites
      ef -= (diffDays - interval_repeat) / interval_repeat * penaltyFactor;
    }
  
    if (ef < 1.3) {
      ef = 1.3;
    }

      let fechanueva = addDaysToDate(fechaActual, interval_repeat);
  if (fechanueva <= fechaActual) {
    fechanueva = addDaysToDate(fechaActual, 1); // Establece la nueva fecha al menos un día en el futuro
  }
    console.log("despues",fechanueva);
    return {racha, ef, interval_repeat, fechanueva};
  }

  useEffect(() => {
    loadReviewCards(params.id, params.deckid);
    
  }, [params.id, params.deckid, loadReviewCards]);

  useEffect(() => {
    setShowBack(false);
  }, [cards, currentCardIndex]);



  const handleButtonClick = (num) => {
    
    if (showBack) {
      if (currentCardIndex < cards.length) {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
        const {racha, ef, interval_repeat, fechanueva} = sm2(num, currentCard.racha, currentCard.interval_repeat, currentCard.ef, currentCard.review_date)
        console.log("despues sm2",racha, ef, interval_repeat, fechanueva);
        updateReviewCards(racha, ef, interval_repeat, fechanueva, currentCard.idcard);
        navigate('/');
      }
      else{
        navigate('/');
      }
    } else {
      setShowBack(true);

    }
  };

  if (cards.length === 0) {
    return <p>No cards available</p>;
  }

  const currentCard = cards[currentCardIndex];


  return (
    <div className='card-size'>
    <div className='content'>
    <Card key={currentCard.idcard} className="estiloCard">
          <p>{showBack ? currentCard.content.reverse : currentCard.content.front}</p>
        </Card>
        {showBack ? (
          <div className='line-buttons'>
            <Button type={"button-red"} onClick={() => handleButtonClick("1")}>Muy mal</Button>
            <Button type={"button-orange"} onClick={() => handleButtonClick("2")}>Mal</Button>
            <Button type={"button-yellow"} onClick={() => handleButtonClick("3")}>Bien</Button>
            <Button type={"button-green"} onClick={() => handleButtonClick("4")}>Muy Bien</Button>
          </div>
        ) : (
          <div className='continue-button'>
            <Button className="continue-style" onClick={handleButtonClick}>Continuar</Button>
          </div>
        )}
    </div>
  </div>
  )
}
export default FlashCard