import { Card, Button } from '../../components/ui/index';
import React, { useState, useEffect } from 'react';
import {decisionTree} from '../../constants/tree.js'
import {runPythonScript} from '../../api/python.api.js'
import './Survey.css'


function Survey() {
  const [currentNode, setCurrentNode] = useState(decisionTree);
  const [userAnswers, setUserAnswers] = useState([]);
  const [binaryAnswers, setBinaryAnswers] = useState([]);
  const [output, setOutput] = useState('');


  const handleAnswerClick = (selectedOption, index) => {
    setUserAnswers([...userAnswers, { question: currentNode.question, answer: selectedOption.answer }]);
    const newBinaryAnswer = index === 0 ? 0 : 1;  
    setBinaryAnswers([...binaryAnswers, newBinaryAnswer]);
    if (selectedOption.nextNode) {
      setCurrentNode(selectedOption.nextNode);
    } else {
      setCurrentNode(null);  // Fin del árbol
    }
  };

  const restartQuiz = () => {
    setCurrentNode(decisionTree);
    setUserAnswers([]);
    setBinaryAnswers([]);
  };

  const getProgress = () => {
    const totalQuestions = userAnswers.length + 1;  // Pregunta actual + respuestas anteriores
    return (totalQuestions / (totalQuestions + 1)) * 100;
  };

  const handleIa = async () => {
    try {
      console.log(Array.isArray(binaryAnswers)); 
      const result = await runPythonScript(binaryAnswers);
      console.log("gg", result)
      setOutput(result.prediction);
    } catch (error) {
      console.error('Error ejecutando el script de Python:', error);
    }
  };

  return (
    <div>
    {currentNode ? (
      <div className='survey-container'>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${getProgress()}%` }}></div>
        </div>
        <p className='Question-style'>{currentNode.question}</p>
        <div className={(currentNode.options.length > 3) ? 'buttons-survey-4' : 'buttons-survey'}>
          {currentNode.options.map((option, index) => (
            <button 
              key={index} 
              className='button-option-survey'
              onClick={() => handleAnswerClick(option, index)}
            >
              {option.answer}
            </button>
          ))}
        </div>
      </div>
    ) : (
      <div>
        <h2>Encuesta completada</h2>
        <ul>
          {userAnswers.map((answer, index) => (
            <li key={index}>{answer.question}: {answer.answer}</li>
          ))}
        </ul>
        <button onClick={restartQuiz}>Reiniciar Encuesta</button>
        <div>
        <h3>Array de respuestas binarias:</h3>
        <ul>
          {binaryAnswers.map((answer, index) => (
            <li key={index}>{answer}</li>
          ))}
          
        </ul>
          <button onClick={handleIa}>Ea</button>
          {output && <p>Resultado del AI: {output}</p>}  {/* Mostrar el resultado del AI */}
      </div>
      </div>
      
    )}
    
  </div>
);
};
export default Survey