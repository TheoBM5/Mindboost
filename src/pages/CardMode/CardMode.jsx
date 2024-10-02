import {Card, Button} from '../../components/ui/index'
import React, { useState, useRef } from 'react';
import { CiTurnR1, CiTurnL1  } from "react-icons/ci";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../components/ui/Modal/Modal';

import "./CardMode.css"
function CardMode() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHelpId, setModalHelpId] = useState(null);
  const [modalContent, setModalContent] = useState([]);
  const [modalCarouselIndex, setModalCarouselIndex] = useState(0);
  const params = useParams();
  
  const navigate = useNavigate();
  const modes = [
    { id: "0", label: "Normal", img: `/img/icon/cardsmodes.webp`},
    { id: "1", label: "Logro/Trofeo", img: `/img/trofeo.webp` },
    { id: "2", label: "Cronometro", img: `/img/cronometro.webp` },
    { id: "3", label: "Rubber Duck", img: `/img/icon/duckchat.webp` },
    { id: "4", label: "Canva",  img: `/img/canva.webp`},
    { id: "5", label: "Analogia",  img: `/img/comic.webp` },
  ];

  const information_modes = [
    { id: '0', label: 'Normal', gif:'/gif/flashcard.gif', subtitle: ['Identificar los conceptos clave','Escribir la pregunta o término', 'Escribir la respuesta o definición'], 
      pages: ['Revisa tus apuntes, libros de texto o cualquier otro material de estudio para identificar los conceptos, términos, fechas, fórmulas o cualquier otra información que necesites memorizar.', 
        'En el lado delantero de la tarjeta, escribe una pregunta, término o concepto. Asegúrate de que sea claro y específico.', 
        'En el lado trasero de la tarjeta, escribe la respuesta, definición o explicación del término. Procura ser conciso pero completo. ']},
    { id: '1', label: 'Logro/Trofeo', subtitle: ['Identifica Proceso','Describe Paso a Paso','Personaliza'], 
      pages: ['Piensa en un proceso que puede ser descrito paso por paso', 
        'Describe el proceso paso por paso',
        'Añade un titulo y una imagen que describa este proceso'] },
    { id: '2', label: 'Cronometro', gif:'/gif/flashcard.gif', subtitle: ['Preparate','Pregunta o concepto','Antes de que se acabe el tiempo'], 
      pages: [' Revisa, estudia y analiza tus apuntes, libros de texto o cualquier otro material de estudio para identificar los conceptos, términos, fechas, fórmulas etc', 
        'Explica los conceptos que se te ocurran despues de haber analizado los materiales de estudio', 
        'Escribe todos las tarjetas que puedas antes de que se acabe el tiempo'] },
    { id: '3', label: 'Rubber Duck', gif:'/gif/animacionduck.gif', subtitle: ['Habla con el patito','Paso a paso','Encuentra el error'], 
      pages: ['Cuando te encuentres con un problema explica al patito, qué es lo que tu debería hacer y cómo esperas que funcione.', 
        'Describe cada paso de tu problema y lo que se supone que hace cada paso, como si estuvieras enseñando al patito. ', 
        'al explicar el problema en términos simples, puedes identificar lo que está mal o pensar en una solución que no habías considerado antes.'] },
    { id: '4', label: 'Canva', subtitle: ['Elige tu tema central','Agrega elemntos para el tema central','Usa palabras clave y frases cortas', 'Incorpora colores y símbolos', 'Organiza y jerarquiza la información'], 
      pages: ['Elige un tema para realizar un mapa mental', 
        'Rodea el tema central de palabras clave que sumen a la compresion del tema central',
        'Los concetos que rodeen al tema central deben ser concisas y claras', 
        'Agrega colores o imagenes que sumen a la presentacion del conceto',
        'Revisa el mapa conceptual y reorganiza los temas en caso de ser necesario'] },
    { id: '5', label: 'Analogia', subtitle: ['Describe el concepto','Crea analogia','Personaliza la analogia'], pages: 
      ['Selecciona un tema y describelo lo mas detallado posible', 
        'Piensa en una analogia que sirva para ddescribir el concepto original', 
        'Crea un comic que describa la analogia, añadiendo imagenes y un titulo que describa cada concepto'] },
  ];

  const modesPerPage = 3;
  const totalPages = Math.ceil(modes.length / modesPerPage);


 
  const handleContainerClick = (cardId) => {
    setSelectedCard(cardId);
  };

  const handleCancelar = () =>{
    navigate("/")
  }

  const handleConfirm = () =>{
      console.log("selected", selectedCard)
      if(selectedCard == 0){
        navigate(`/deck/${params.id}/${params.deckid}/new/card`);
  
      }
      if(selectedCard == 1){
        navigate(`/deck/${params.id}/${params.deckid}/achievement`);
      }
      if(selectedCard == 2){
        navigate(`/deck/${params.id}/${params.deckid}/clock`);
      }
      if(selectedCard == 3){
        navigate(`/deck/${params.id}/${params.deckid}/duck`);
      }
      if(selectedCard == 4){

      }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleHelpMode = (event, index, modoid) => {
    event.stopPropagation();
    setModalContent([information_modes[index]]);
    setModalCarouselIndex(0);
    setIsModalOpen(true);
    setModalHelpId(modoid)
  };

  const handleModalNextPage = () => {
    if (modalCarouselIndex < information_modes.length - 1) {
      setModalCarouselIndex(modalCarouselIndex + 1);
    }
  };

  const handleModalPrevPage = () => {
    if (modalCarouselIndex > 0) {
      setModalCarouselIndex(modalCarouselIndex - 1);
    }
  };
  const startIndex = currentPage * modesPerPage;
  const endIndex = startIndex + modesPerPage;
  const currentModes = modes.slice(startIndex, endIndex);

  return (
    <>
    {isModalOpen && (
      <Modal>
        <div className='modal-content-help'>
              <h1 className='title-help-modal'>{information_modes[modalHelpId].label}</h1>
              <img src={information_modes[modalHelpId].gif} className='img-modal-help'/>
              <h4 className='subtitle-help-mode'>{information_modes[modalHelpId].subtitle[modalCarouselIndex]}</h4>
              <p className='text-modal-help' dangerouslySetInnerHTML={{ __html: information_modes[modalHelpId].pages[modalCarouselIndex] }} />
            <button className="prev-button-help" onClick={handleModalPrevPage} disabled={modalCarouselIndex === 0}>
            <GoChevronLeft/>
            </button>
            <button className="next-button-help" onClick={handleModalNextPage} disabled={modalCarouselIndex === information_modes[modalHelpId].pages.length - 1}>
            <GoChevronRight />
            </button>
            <button className="close-modal-help" onClick={() => setIsModalOpen(false)}>X</button>
            <div className='circles-content-mode'>
            {information_modes[modalHelpId].pages.map((element, index) => (
              <div
              key={index}
              className={`circle-help ${modalCarouselIndex === index ? 'active-circle' : ''}`}
            ></div>
          ))}
          </div>
        </div>
      </Modal>
    )}
      <article className="tile-content-mode">
        
        {currentModes.map((mode) => (
          
          <div htmlFor={mode.id}
          key={mode.id}
          className={`tile-mode ${selectedCard === mode.id ? 'selected' : ''}`}
          onClick={() => handleContainerClick(mode.id)}>
            <div>
              <input
                className='radio-mode'
                type="radio"
                name="card"
                id={mode.id}
                checked={selectedCard === mode.id}
                onChange={() => {}}
              />
            </div>
            <button className='help-mode-button' onClick={(e) => handleHelpMode(e, startIndex+1, mode.id)}>?</button>
            <div className="PruebaAnimation"><img className="imagen-tile-modes" src={mode.img}/></div>
            <label htmlFor={mode.id}>
              {mode.label}
            </label>
          </div>
        ))}
      </article>
      <footer className="buttons-confirm">
      {currentPage !== 0 &&(
        <Button className="prev-mode" onClick={handlePrevPage}>
          Anterior
        </Button>
        )
      }
      <div className='buttons-confirm-mode'>
        <Button onClick={handleCancelar}>Cancelar</Button>
        <Button onClick={handleConfirm}>Confirmar</Button>
      </div>
        {currentPage !== totalPages - 1 &&(
        <Button className="next-mode" onClick={handleNextPage}>
          Siguiente
        </Button>
        )}
      </footer>
    </>
  );
}
export default CardMode