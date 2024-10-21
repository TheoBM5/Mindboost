import { Card, Button,Input } from '../../components/ui/index';
import { useCards } from "../../context/CardContext";
import { useParams } from "react-router-dom";
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { ICON_NAMES } from "../../constants/icon"; 
import { useNavigate } from 'react-router-dom';
import './FlashCard.css';
import ChatDuck from '../../components/ChatDuckCard/ChatDuck';



function FlashCard() {
  const { cards, loadReviewCards, updateReviewCards } = useCards();
  const params = useParams();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();
  const [answeredQuestions, setAnsweredQuestions] = useState([]); // Lista de preguntas ya respondidas
  const [showAnswer, setShowAnswer] = useState(false); // Controla cuándo mostrar la respuesta
  const chatContainerRef = useRef(null);

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


  useLayoutEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [answeredQuestions, currentQuestionIndex]);

  useEffect(() => {
    setShowBack(false);
    setShowInput(false);
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
      setShowInput(true);
    }
  };

  if (cards.length === 0) {
    return <p>No cards available</p>;
  }

  const sortContent = (content) => {
    console.log(content)
    return content
      .split('\n') 
      .sort((a, b) => {
        const numA = parseInt(a.split('.')[0], 10);
        const numB = parseInt(b.split('.')[0], 10);
        return numA - numB; // Ordenamos de menor a mayor
      })
      .join('\n'); 
  };


  const handleNextQuestion = () => {
    console.log("input", showInput);
    console.log("lastquestion", isLastQuestion);

    if (showInput || isLastQuestion) {
      if (isLastQuestion) {
        setShowBack(true);
      } else {
        // Avanza a la siguiente pregunta
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        const isLastQuestion = currentQuestionIndex === currentCard.content.questions.length;
        setShowInput(false);  
        setAnsweredQuestions((prev) => [
          ...prev,
          {
            question: currentQuestion.text,
            answer: currentQuestion.answer,
          },
        ]);
      }
  
    } else {
      setShowInput(true);
      
    }
  };


  const currentCard = cards[currentCardIndex];
  console.log("total",currentCard.content.questions.length)
  const currentQuestion = currentCard.content.questions[currentQuestionIndex];
  console.log("totalActual",currentQuestionIndex)
  const isLastQuestion = currentQuestionIndex === currentCard.content.questions.length;
  console.log("last", isLastQuestion)


  return (
    <div className='card-size'>
      {currentCard.typecard === "1" || currentCard.typecard === "2" || currentCard.typecard === "4"? (
        <div className='content'>
          <Card key={currentCard.idcard} className="estiloCard">
            <p>{showBack ? currentCard.content.reverse : currentCard.content.front}</p>
          </Card>
          {showBack ? (
            <div className='line-buttons'>
              <Button type="button-red" onClick={() => handleButtonClick("1")}>Muy mal</Button>
              <Button type="button-orange" onClick={() => handleButtonClick("2")}>Mal</Button>
              <Button type="button-yellow" onClick={() => handleButtonClick("3")}>Bien</Button>
              <Button type="button-green" onClick={() => handleButtonClick("4")}>Muy Bien</Button>
            </div>
          ) : (
            <div className='continue-button'>
              <Button className="continue-style" onClick={handleButtonClick}>Continuar</Button>
            </div>
          )}
        </div>
      ) : currentCard.typecard === "3" ? (
        <div className='content-2'>
        <Card key={currentCard.idcard} className="estilo-Card-2">
            {showBack ? (
              <div>
              {React.createElement(ICON_NAMES[currentCard.content.icon], {
                className: "selected-icon"
              })}
              <p>{currentCard.content.front}</p>
              <p className='orden-list-logro'>{sortContent(currentCard.content.reverse)}</p>
            </div>
          ) :( 
              <div>
              {React.createElement(ICON_NAMES[currentCard.content.icon], {
                className: "selected-icon"
              })}
              <p className='title-logro-repaso'>{currentCard.content.front}</p>
            </div>
            )}
          </Card>
          {showBack ? (
            <div className='line-buttons'>
              <Button type="button-red" onClick={() => handleButtonClick("1")}>Muy mal</Button>
              <Button type="button-orange" onClick={() => handleButtonClick("2")}>Mal</Button>
              <Button type="button-yellow" onClick={() => handleButtonClick("3")}>Bien</Button>
              <Button type="button-green" onClick={() => handleButtonClick("4")}>Muy Bien</Button>
            </div>
          ) : (
            <div className='continue-button'>
              <Button className="continue-style" onClick={handleButtonClick}>Continuar</Button>
            </div>
          )}
          </div>
      ) :currentCard.typecard === "5" ? (
        <div className='content-2'>
          <Card key={currentCard.idcard} className="estilo-Card-5">
          <h3>{currentCard.content.title}</h3>
          <div className='chat-cont-review' ref={chatContainerRef}>
          {answeredQuestions.map((qa, index) => (
              <div key={index}>
                <ChatDuck text={qa.question} />
                <Input className="input-review-duck" value={qa.answer} disabled />
              </div>
            ))}
          {!isLastQuestion && (
            <>
              <ChatDuck text={currentCard.content.questions[currentQuestionIndex].text} />
              {showInput && (
                <Input className="input-review-duck" value={currentCard.content.questions[currentQuestionIndex].answer} disabled />
              )}
            </>
          )}
          </div>
      {!showBack && (
      <div className='continue-button'>
        <Button className="continue-style" onClick={handleNextQuestion}>
          {isLastQuestion ? "Finalizar" : "Siguiente"}
        </Button>
      </div>
      )}
            {showBack && (
              <div className='line-buttons'>
                <Button type="button-red" onClick={() => handleButtonClick("1")}>Muy mal</Button>
                <Button type="button-orange" onClick={() => handleButtonClick("2")}>Mal</Button>
                <Button type="button-yellow" onClick={() => handleButtonClick("3")}>Bien</Button>
                <Button type="button-green" onClick={() => handleButtonClick("4")}>Muy Bien</Button>
              </div>
            )}
          </Card>
        </div>
      ): null}
    </div>
  );
}
export default FlashCard