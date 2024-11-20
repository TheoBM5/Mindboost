import { Card, Button } from '../../components/ui/index';
import React, { useState, useEffect } from 'react';
import {decisionTree} from '../../constants/tree.js'
import {runPythonScript} from '../../api/python.api.js'
import {answersClass} from '../../constants/result-ia.js'
import TreeResult from '../TreeResult/TreeResult.jsx';
import { useParams } from 'react-router-dom';
import './Survey.css'


function Survey() {
  const [currentNode, setCurrentNode] = useState(decisionTree);
  const [userAnswers, setUserAnswers] = useState([]);
  const [binaryAnswers, setBinaryAnswers] = useState([]);
  const [output, setOutput] = useState('');
  const [clasesIa, setClasesIa] = useState(null);
  const params = useParams();
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
    setClasesIa(null);
  };

  const getProgress = () => {
    const totalQuestions = userAnswers.length + 1;  // Pregunta actual + respuestas anteriores
    return (totalQuestions / (totalQuestions + 1)) * 100;
  };

  const handleIa = async () => {
    try {
      const result = await runPythonScript(binaryAnswers);
      const clasesIa = answersClass[result];
      setClasesIa(clasesIa);
      setOutput(result.prediction);

      // 
    } catch (error) {
      console.error('Error ejecutando el script de Python:', error);
    }
  };

  useEffect(() => {
    if (!currentNode) {
      handleIa();  // Ejecutar la IA cuando se completa la encuesta
    }
  }, [currentNode]);

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
      clasesIa && (
        <TreeResult type1={clasesIa[0]} type2={clasesIa[1]} type3={clasesIa[2]} type4={params.opc} />
      )
    )}
    </div>
);
};
export default Survey