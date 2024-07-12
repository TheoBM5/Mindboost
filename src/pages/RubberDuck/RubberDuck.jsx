import Duck from "../../components/Duck/Duck"
import React, { useState, useEffect } from 'react';
import {Card, Input, TextArea, Button, Label} from "../../components/ui/index";
import './RubberDuck.css'
function RubberDuck() {
  const [isTyping, setIsTyping] = useState(false);
  let typingTimeout = null;

  const handleInputChange = (event) => {
    clearTimeout(typingTimeout);
    setIsTyping(true);

    typingTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 9000); // Cambia a falso después de 1 segundo de inactividad

    // Actualiza el valor del input (opcional)
    // setValue(event.target.value); 
  };

  useEffect(() => {
    return () => {
      clearTimeout(typingTimeout);
    };
  }, []);


  return (
    <main className="rubber-duck-cont">
      <div className="cont-card-duck">
        <Card className={"card-duck-text"}>
          <Label>Titulo</Label>
          <Input className="title-duck-text"></Input>
          <Label>Descripcion</Label>
          <TextArea className="text-description-duck" onChange={handleInputChange}></TextArea>
        </Card>
      </div>
      <div className="cont-duck">
        <div className="duck-window">
          <Duck top="0" left="0" bottom="0" right="0" isTyping={isTyping}/>
            {isTyping && (
                  <div className="water-big-wrapper">
                  <div className="water-big-wrap">
                    <div className="water-big">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div className="water-big snd">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div className="water-big trd">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div> 
                )}
              
                {!isTyping && (
                <div className="wave-container">
                  <div className="wave"></div>
                  <div className="wave"></div>
                  <div className="wave"></div>
                  <div className="wave"></div>
              </div>
                )}

        </div>
        {/* {isTyping && (
        <div className="water-lines-wrapper">
          <div className="water-lines">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )} */}


      </div>
    </main>
  )
}
export default RubberDuck