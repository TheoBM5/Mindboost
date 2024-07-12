import { Card, Button } from '../../components/ui/index';
import React, { useState, useEffect } from 'react';
import './Survey.css'


function Survey() {

  const questions = [
    {
      question: '¿Cuál es la capital de Francia?',
      options: ['Madrid', 'Berlín', 'Paris'],
      correctAnswer: 'París',
    },
    {
      question: '¿Cuál es el río más largo del mundo?',
      options: ['Nilo', 'Amazonas', 'Misisipi', 'Yangtsé'],
      correctAnswer: 'Amazonas',
    },
    {
      question: '¿Escribir o dibujar?',
      options: ['Escribir', 'Leer'],
      correctAnswer: 'Amazonas',
    },
    // Agrega más preguntas según sea necesario
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);


  const handleAnswerClick = (selectedAnswer) => {
    setSelectedAnswer(selectedAnswer);
  };

  const handleContinueClick = () => {
    if (selectedAnswer !== null) {
      setUserAnswers([...userAnswers, { question: currentQuestion, answer: selectedAnswer}]);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }
  };

  const handleBackClick = () => {
    setCurrentQuestion(currentQuestion - 1);
    const updatedAnswers = [...userAnswers];
    const lastAnswer = updatedAnswers.pop();
    if (lastAnswer.correct) {
      setScore(score - 1);
    }
    setUserAnswers(updatedAnswers);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setScore(0);
    setSelectedAnswer(null);
  };

  const getProgress = () => {
    return ((currentQuestion + 1) / questions.length) * 100;
  };

  return (
    <div>
      
      {currentQuestion < questions.length ? (
        
        <div className='survey-container'>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${getProgress()}%` }}></div>
          </div>
          <p className='Question-style'>{questions[currentQuestion].question}</p>
          <div className={(questions[currentQuestion].options.length)>3?'buttons-survey-4':'buttons-survey'}>
            {questions[currentQuestion].options.map((option, index) => (
              <button 
              key={index} 
              className={`button-option-survey ${selectedAnswer === option ? 'selected' : ''}`}
              onClick={() => handleAnswerClick(option)}
            >
              {option}
            </button>
            ))}
          </div>
          <div className='buttons-container-survey'>
            {currentQuestion > 0 && (
              <button className='buttons-prev-next' onClick={handleBackClick}>Regresar</button>
            )}
            <button 
              className='buttons-prev-next' 
              onClick={handleContinueClick} 
              style={{ margin: currentQuestion > 0 ? null : '0 auto' }}
              disabled={selectedAnswer === null}
            >
              Continuar
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2>Quiz completado</h2>
          <p>Puntaje: {score}</p>
          <button onClick={restartQuiz}>Reiniciar Quiz</button>
        </div>
      )}
    </div>
  );
};

export default Survey