import Duck from "../../components/Duck/Duck"
import React, { useState, useEffect, useRef } from 'react';
import usePreferencesStore from '../../constants/preferencesZus';
import {useForm} from "react-hook-form";
import { BlockPicker } from 'react-color';
import Lines from "./Lines";
import Onda from "./Onda";
import Wave from "./Wave";
import {Card, Input, TextArea, Button, Label} from "../../components/ui/index";
import { CiTrash } from "react-icons/ci";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useCards } from "../../context/CardContext"
import Tutorial from "../../components/Tutorial/Tutorial";
import './RubberDuck.css'

const tutorialSteps = [
  { 
    selector: '.title-duck-text', 
    title: 'Título del tema', 
    message: 'Aquí puedes agregar el título del tema que el pato te ayudará a comprender.' 
  },
  { 
    selector: '.text-description-duck', 
    title: 'El pato', 
    message: 'Si no escribes nada, el pato flotará. Cuando comiences a escribir, el pato comenzará a surfear las olas, ayudándote a visualizar la fluides que tienes con el tema.' 
  },
  { 
    selector: '.duck-window', 
    title: 'Guardar', 
    message: 'Aquí puedes guardar el texto que le escribas al pato, para que puedas consultarlo más tarde.' 
  },
];


function RubberDuck() {
  const [isTyping, setIsTyping] = useState(false);
  const [colorWindow, setColorWindow] = useState(false);
  const {register, handleSubmit, formState: {errors}, setValue, reset, clearErrors, getValues } = useForm ();
  const {createCard, updateCard, loadCard, errors: CardErrors} = useCards();
  const menuColorRef = useRef(null);
  const navigate = useNavigate();
  const params = useParams();
  let typingTimeout = null;
  const { color_duck, setColorDuck } = usePreferencesStore();
  const [selectedColor, setSelectedColor] = useState(color_duck);
  const location = useLocation();
  const [isTutorialActive, setIsTutorialActive] = useState(location.state ?? false);
  const startTutorial = () => setIsTutorialActive(true);
  const endTutorial = () => setIsTutorialActive(false);

  const handleInputChange = (event) => {
    clearTimeout(typingTimeout);
    setIsTyping(true);

    typingTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 9000);
  };

 const handleColorWindow = (event) => {
  event.preventDefault();
  setColorWindow(!colorWindow);
};

const handleColorChange = (color) => {
  setSelectedColor(color.hex);
  setColorDuck(color.hex);

};

const handleClickOutside = (event) => {
  if (menuColorRef.current && !menuColorRef.current.contains(event.target)) {
    setColorWindow(false);
  }
};

useEffect(() => {
  setSelectedColor(color_duck); 
}, [color_duck]);

useEffect(() => {
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
    clearTimeout(typingTimeout);
  };
}, [colorWindow]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const deck = await createCard(params.deckid, data, params.id, 4);
      if (deck) {
        navigate("/");

      }

      // alert('Imagen subida y guardada con éxito');
    } catch (error) {
      console.error('Error ', error);
    }
  });

  const handleReset = (event) => {
    event.preventDefault();
    reset({ description: '' });
  };

  return (
    <main className="rubber-duck-cont">
        {isTutorialActive && (
          <Tutorial steps={tutorialSteps} onClose={endTutorial} />
        )}
        <Card className={"card-duck-text"}>
          <form className="duck-form" onSubmit={onSubmit}>
          <Label>Titulo</Label>
          <Input className="title-duck-text"
            {...register("front",{
              required: true,
          })}
          placeholder="Titulo" 
          />
          {errors.front && (
                        <p className="error-message">title text is required</p>
                    )
                        
                    }
          <Label>Descripcion</Label>
          <TextArea 
          {...register("reverse",{
            required: true,
          })}
          placeholder="Descripcion"
            className="text-description-duck" onChange={handleInputChange}
            />
          {
            errors.reverse && (
                <p className="error-message">Description text is required</p>
            )
              
          }
          <div className="buttons-duck">
            <button className="delete-button-duck" onClick={handleReset}><CiTrash className="delete-icon-duck"/></button>
            <Button>Enviar</Button>
            <button className="color-button-duck" style={{backgroundColor: selectedColor}} ref={menuColorRef} onClick={handleColorWindow}></button>
            {colorWindow && (
              <div className="color-picker-container" ref={menuColorRef}>
              <BlockPicker color={selectedColor} onChange={handleColorChange}  />
            </div>
            )}
          </div>
          </form>
        </Card>
      <div className="cont-duck">
        <div className="duck-window" style={{backgroundColor: selectedColor}}>
          {/* <Duck top="0" left="0" bottom="0" right="0" isTyping={isTyping}/> */}
          <div className="cont-image-duck-wave">
            <img className="duck-img" src="/img/modes/duck1.webp"/>
              {isTyping && (
                    <Onda/>
                  )}
                
                  {!isTyping && (
                    <>
                    {/* <Onda/> */}
                    <Wave/>
                    </>
                  )}
          </div>
        </div>
      </div>
    </main>
  )
}
export default RubberDuck