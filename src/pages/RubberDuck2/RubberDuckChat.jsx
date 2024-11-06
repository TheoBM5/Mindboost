import './RubberDuckChat.css'
import React, { useState } from 'react';
import {Card, Input, Label} from '../../components/ui/index';
import Buton from '../../components/ui/Boton/Buton';
import { useNavigate, useParams } from "react-router-dom";
import { useCards } from "../../context/CardContext";
import ChatDuck from '../../components/ChatDuckCard/ChatDuck';
function RubberDuckChat() {
  const [questions, setQuestions] = useState([{ id: 1, text: '', answer: ''}]);
  const [makeQuestions, setMakeQuestions] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false); 
  const [titleChat, setTitleChat] = useState("");
  const {createCard, updateCard, loadCard, errors: CardErrors} = useCards();
  const params = useParams();
  const navigate = useNavigate();
  
  const handleAddQuestion = () => {
    if (questions[questions.length - 1].text.trim() === '') {
      alert("No puedes agregar una nueva pregunta si la anterior está vacía.");
      return;
    }
    setQuestions([...questions, { id: questions.length + 1, text: '', answer: '' }]);
  };

  const handleInputChange = (id, e, isAnswer = false) => {
    const newQuestions = questions.map((q) =>
      q.id === id ? { ...q, [isAnswer ? 'answer' : 'text']: e.target.value } : q
    );
    setQuestions(newQuestions);
  };

  const handleInputTitle = (e) => {
    setTitleChat(e.target.value);
  }

  const handleRemoveQuestion = () => {
    if (questions.length > 1) {
      const newQuestions = questions.slice(0, -1); // Removemos el último elemento
      setQuestions(newQuestions);
    }
  };

  const handleNextSetQuestions = () => {
     // Verificar si alguna de las preguntas está vacía
  const allFilled = questions.every((q) => q.text.trim() !== '');
  const titleFilled = titleChat != '' ;
  if (!allFilled) {
    alert("Por favor, completa todas las preguntas antes de continuar.");
    return;
  }
  if (!titleFilled){
    alert("Por favor, Ingresa un titulo antes de continuar.");
    return;
  }
  setMakeQuestions(false);
  }

  const handleNextQuestion = () => {
    if (questions[currentQuestionIndex].answer.trim() !== '') {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        setAllQuestionsAnswered(true);
      }
    } else {
      alert('Por favor responde la pregunta antes de continuar.');
    }
  };


  const handleSaveData = async () => {
    const finalData = {
      title: titleChat,
      questions: questions.map((q) => ({
        id: q.id,
        text: q.text,
        answer: q.answer,
      })),
    };
  
    try {
      const deck = await createCard(params.deckid, finalData, params.id, 5);
      if (deck) {
        navigate("/");
        console.log("Deck creado:", deck);
      }
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  
    console.log("Datos guardados (JSON):", JSON.stringify(finalData));
    console.log("Datos guardados (Objeto):", finalData);
  };
  return (
    <div>
    {makeQuestions ? (
      <div className='cont-duck2'>
      <Card className={"card-question-duck"}>
        {/* <Buton className="close-questions-card" label="X"/> */}
            <div className='title-duck2'>
              <Label>Tema: </Label>
              <Input className="input-title-chat"
                placeholder="Titulo"
                onChange={(e) => handleInputTitle(e)}
                />
            </div>
            <Label className="label-style-comp-chat">Ingresa las preguntas</Label>
          <div className='question-input-box'>
        {questions.map((question) => (
            <Input
              key={question.id}
              value={question.text}
              onChange={(e) => handleInputChange(question.id, e)}
              placeholder={`Pregunta ${question.id}`}
              className="input-duck-question"
            />
          ))}
          </div>
          <img src='/img/icon/duckchat.webp'/>
        <div className='buttons-duck2'>
          <div className='buttons-agregar-chat'>
            <Buton label="-" onClick={handleRemoveQuestion}/>
            <Buton label="+"  onClick={handleAddQuestion}/>
          </div>
          <Buton label="Responder" onClick={handleNextSetQuestions} className={"next-button-duck"}></Buton>
        </div>
      </Card>
    </div>
    ):(
      <div>
        <Card className={"answer-card-duck"}>
        <Label>Responde las preguntas</Label>
        <div className='cont-answer-chat'>
        {questions.slice(0, currentQuestionIndex + 1).map((question) => (
            <React.Fragment key={question.id}>
              <ChatDuck text={question.text} />
            <div className='card-chat-duck-2'>
              <Input
                value={question.answer}
                onChange={(e) => handleInputChange(question.id, e, true)}
                placeholder={"Respuesta"}
                className="input-duck-answer"
              />
              <div className='chat-icon-duck-2'></div>
            </div>
          </React.Fragment>
          ))}
          </div>
            {allQuestionsAnswered ? (
              <Buton label="Guardar" onClick={handleSaveData} className="save-button-duck" />
            ) : (
              <Buton label="Siguiente" onClick={handleNextQuestion} className="next-button-duck" />
            )}
        </Card>
      </div>
    )} 
    </div>
  )
}
export default RubberDuckChat