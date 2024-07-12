import {Card, Input, TextArea, Button, Label} from "../../components/ui/index";
import {useForm} from "react-hook-form";
import React, { useState, useRef } from 'react';
import { ICON_NAMES } from "../../constants/icon"; 
import ModalCrop from "../ImageRecorte/ModalCrop";
import './Logro.css';
function Logro() {

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };
  const {register, handleSubmit, formState: {errors}, setValue} = useForm ();
  const [selectedIcon, setSelectedIcon] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [text, setText] = useState('');
  const ImageLogro = useRef(
    ""
  );

  const ImagelogroUpdate = (imgSrc) => {
    ImageLogro.current = imgSrc
  }

  const handleIconClick = (name) => {
    setSelectedIcon(name);
    setValue('icon', name);
  };

  const handleNumberLines = () => {
    const lines = text.split('\n');
    const numberedLines = lines.map((line, index) => `${index + 1}. ${line}`);
    setText(numberedLines.join('\n'));
  };

  const formatText = (symbol) => {
    const textarea = document.getElementById('textArea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end);
    const beforeText = text.substring(0, start);
    const afterText = text.substring(end);

    setText(`${beforeText}${symbol}${selectedText}${symbol}${afterText}`);
  };

  return (
    <div className="page-logro-container">

        <Card className={"logro-style-card"}>
            <main className="logro-content">
                <div className="text-area-logro-cont">
                  <Label>Descripcion</Label>
                  <div className="buttons">
                    <button onClick={handleNumberLines}>Number Lines</button>
                  </div>
                  <TextArea className="text-area-logro" id="textArea" value={text} onChange={(e) => setText(e.target.value)}/>
                </div>
                <div className="finish-button-content">
                  <button className="button-terminar">Terminar</button>
                </div>
                <div className="label-container-logro">
                    <div className="cont-image-logro">

                      <div className="preview-image-logro" onClick={handleButtonClick}>
                        <img className="img-cont-logro" src={ImageLogro.current}
                          alt="Avatar"/>
 
                          {/* {selectedIcon && React.createElement(ICON_NAMES[selectedIcon], {className: "selected-icon"})}
                          <input type="hidden" {...register('icon')} value={selectedIcon || ''} /> */}
                      </div>
                      <button className="icon-logro-up">.</button>
                      <button className="image-logro-up" onClick={() => setModalOpen(true)}>-</button>
                    </div>

                    {isOpen &&(
                      <div className="image-box-modal">
                        {Object.entries(ICON_NAMES).map(([name, Icon]) => (
                        <Icon
                        key={name}
                        className={`menu-iconos ${selectedIcon === name ? 'active' : ''}`}
                        onClick={() => handleIconClick(name)}
                        />
                            ))}
                      </div>
                    )}
                  <Label>Titulo</Label>
                  
                  <Input className="input-logro"/>
                </div>
                <footer className="button-aplicar-contenedor">
                  <button className="button-logro">Aplicar</button>

                </footer>
            </main>
        </Card>
        {modalOpen && (
        <ModalCrop
          ImagelogroUpdate={ImagelogroUpdate}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}
export default Logro