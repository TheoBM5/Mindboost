import Duck from "../../components/Duck/Duck"
import React, { useState, useEffect, useRef } from 'react';
import {useForm} from "react-hook-form";
import { BlockPicker } from 'react-color'
import Lines from "./Lines";
import Onda from "./Onda";
import Wave from "./Wave";
import {Card, Input, TextArea, Button, Label} from "../../components/ui/index";
import { CiTrash } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { useCards } from "../../context/CardContext"
import './RubberDuck.css'
function RubberDuck() {
  const [isTyping, setIsTyping] = useState(false);
  const [colorWindow, setColorWindow] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const {register, handleSubmit, formState: {errors}, setValue, reset, clearErrors, getValues } = useForm ();
  const {createCard, updateCard, loadCard, errors: CardErrors} = useCards();
  const menuColorRef = useRef(null);
  const navigate = useNavigate();
  const params = useParams();
  let typingTimeout = null;

  const handleInputChange = (event) => {
    clearTimeout(typingTimeout);
    setIsTyping(true);

    typingTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 9000); // Cambia a falso después de 1 segundo de inactividad
  };

 const handleColorWindow = (event) => {
  event.preventDefault();
  setColorWindow(!colorWindow);
};

const handleColorChange = (color) => {
  setSelectedColor(color.hex);
  console.log(selectedColor)
};

const handleClickOutside = (event) => {
  if (menuColorRef.current && !menuColorRef.current.contains(event.target)) {
    setColorWindow(false);
  }
};

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
        console.log(deck);
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
      <div className="cont-card-duck">
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
            {/* <button>Frase</button> */}
          </div>
          </form>
        </Card>
      </div>
      <div className="cont-duck">
        <div className="duck-window" style={{backgroundColor: selectedColor}}>
          <Duck top="0" left="0" bottom="0" right="0" isTyping={isTyping}/>
            {isTyping && (
                  <Onda/>
                )}
              
                {!isTyping && (
                  <>
                <Wave/>
              {/* <Lines top="650px" left="300px"/>
              <Lines top="650px" left="100px"/>
              <Lines top="750px" left="200px"/> */}
                  </>
                )}
        </div>
      </div>
    </main>
  )
}
export default RubberDuck