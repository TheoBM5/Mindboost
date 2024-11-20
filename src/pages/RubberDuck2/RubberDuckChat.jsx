import './RubberDuckChat.css'
import React, { useState, useRef, useEffect} from 'react';
import {Card, Input, Label} from '../../components/ui/index';
import Buton from '../../components/ui/Boton/Buton';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useCards } from "../../context/CardContext";
import Tutorial from "../../components/Tutorial/Tutorial";
import ChatDuck from '../../components/ChatDuckCard/ChatDuck';

const tutorialSteps = [
  { 
    selector: '.input-title-chat', 
    title: 'Título del tema', 
    message: 'Aquí puedes agregar el título del tema sobre el cual el pato realizará preguntas.' 
  },
  { 
    selector: '.card-question-duck img', 
    title: 'El pato', 
    message: 'Este es el pato que hará las preguntas y con quien interactuarás en el chat.' 
  },
  { 
    selector: '.question-input-box', 
    title: 'Preguntas', 
    message: 'En este espacio puedes escribir las preguntas que quieres que el pato te haga relacionadas con tu tema.' 
  },
  { 
    selector: '.buttons-agregar-chat', 
    title: 'Administrar preguntas', 
    message: 'Usa estos botones para agregar nuevas preguntas o eliminar las que ya no necesites.' 
  },
  { 
    selector: '.chat-duck-interaction', 
    title: 'Responde al pato', 
    message: 'En la siguiente pantalla podrás interactuar con el pato respondiendo a las preguntas que te haga.' 
  },
];


function RubberDuckChat() {
  const [questions, setQuestions] = useState([{ id: 1, text: '', answer: ''}]);
  const [makeQuestions, setMakeQuestions] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false); 
  const [titleChat, setTitleChat] = useState("");
  const endOfContentRef = useRef(null);
  const {createCard, updateCard, loadCard, errors: CardErrors} = useCards();
  const params = useParams();
  const location = useLocation();
  const [isTutorialActive, setIsTutorialActive] = useState(location.state ?? false);
  const startTutorial = () => setIsTutorialActive(true);
  const endTutorial = () => setIsTutorialActive(false);
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
      const newQuestions = questions.slice(0, -1); 
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

  useEffect(() => {
    endOfContentRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [questions, currentQuestionIndex]);



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
  
      }
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  
  };

  return (
    <div>
    {makeQuestions ? (
      
      <div className='cont-duck2'>
        {isTutorialActive && (
          <Tutorial steps={tutorialSteps} onClose={endTutorial} />
        )}
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
        <div className='cont-answer-chat' >
        {questions.slice(0, currentQuestionIndex + 1).map((question) => (
            <React.Fragment key={question.id}>
              <ChatDuck text={question.text} isEditable={false} imageSrc="/img/icon/duckchat.webp" />
              <ChatDuck
                    text={question.answer}
                    isEditable={true}
                    onTextChange={(e) => handleInputChange(question.id, e, true)}
                    placeholder="Respuesta"
                    className="chat-card-2"
                    classNameBubble="bubble-2"
                  />
          </React.Fragment>
          ))}
          <div ref={endOfContentRef} />
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