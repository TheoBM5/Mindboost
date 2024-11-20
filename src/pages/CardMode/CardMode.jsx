import { Card, Button } from '../../components/ui/index'
import React, { useState, useRef } from 'react';
import { CiTurnR1, CiTurnL1 } from "react-icons/ci";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../components/ui/Modal/Modal';

import "./CardMode.css"
function CardMode() {
  const [selectedCard, setSelectedCard] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHelpId, setModalHelpId] = useState(null);
  const [modalContent, setModalContent] = useState([]);
  const [modalCarouselIndex, setModalCarouselIndex] = useState(0);
  const [isTutorialMode, setIsTutorialMode] = useState(false);
  const params = useParams();

  const navigate = useNavigate();
  const modes = [
    { id: "0", label: "Flash Card", img: `/img/modes/Flashcard1.webp` },
    { id: "1", label: "Logro/Trofeo", img: `/img/modes/trofeo1.webp` },
    { id: "2", label: "Cronometro", img: `/img/modes/flashreloj.webp` },
    { id: "3", label: "Rubber Duck", img: `/img/modes/duck1.webp` },
    { id: "4", label: "Canva", img: `/img/modes/canva1.webp` },
    { id: "5", label: "Analogia", img: `/img/modes/comic1.webp` },
  ];

  const information_modes = [
    {
      id: '0',
      label: 'Flashcards',
      gif: '/gif/flashcard.gif',
      subtitle: [
        'Investigar',
        'Analizar y Encontrar conceptos clave',
        'Escribir la respuesta o definición',
        'Resumen'
      ],
      pages: [
        {
          text: '<span> Investiga </span> en tus libros, apuntes o materiales de referencia. Busca los temas esenciales que necesitas comprender o memorizar para lograr un aprendizaje efectivo.',
          gif:  '/gif/general/book1.webm'
        },
        {
          text: '<span> Analiza </span> la información e identifica los puntos clave. Resúmelos en <span> Preguntas </span> o <span> Conceptos </span> claros que serán la base para tus tarjetas de estudio.',
          gif:  '/gif/general/search1.webm'
        },
        {
          text: 'En el lado <span> Frontal </span> de la tarjeta, escribe una pregunta, término o concepto clave. <br /> En el  <span> Reverso  </span> de la tarjeta, escribe la respuesta, definición o explicación correspondiente.',
          gif:  '/gif/flash/flashcard2.webm'
        },
        {
          text: 'Revisar, analizar y escribir. Resúmelo de forma breve, pero incluye los detalles necesarios para garantizar una comprensión completa.',
          gif:  '/gif/flash/flash.webm'
        }
      ]
    },
    {
      id: '1',
      label: 'Logro/Trofeo',
      gif: '/gif/cake/cakeloading.webm',
      subtitle: [
        'Identifica Proceso',
        'Describe Paso a Paso',
        'Personaliza',
        'Resumen'
      ],
      pages: [
        {
          text: '<span>Identifica un proceso </span> que pueda dividirse en pasos claros y específicos. Piensa en qué acciones clave representan el logro.',
          gif: '/gif/cake/cakeloading.webm'
        },
        {
          text: '<span> Detalla cada paso </span>  del proceso. Describe cómo se avanza desde el inicio hasta completar el objetivo.',
          gif: '/gif/cake/cakelist.webm'
        },
        {
          text: 'Asigna un <span> título </span> llamativo y añade una <span> imagen </span> que capture la esencia del proceso o logro.',
          gif: '/gif/cake/cakepop.webm'
        },
        {
          text: 'Análisis, descripción y personalización hacen que tu proceso sea memorable y claro.',
          gif: '/gif/cake/cake.webm'
        }
      ]
    },
    {
      id: '2',
      label: 'Cronómetro',
      gif: '/gif/flashcard.gif',
      subtitle: [
        'Prepárate',
        'Pregunta o concepto',
        'Antes de que se acabe el tiempo',
        'Resumen'
      ],
      pages: [
        {
          text: '<span>Prepárate</span> repasando tus libros, apuntes o materiales de referencia. <span> Identifica </span> los temas esenciales que necesitas recordar.',
          gif: '/gif/general/book1.webm'
        },
        {
          text: 'Analiza la información y convierte los puntos clave en <span>preguntas</span> o <span>conceptos</span> que serán la base de tus tarjetas.',
          gif: '/gif/general/search1.webm'
        },
        {
          text: 'Pon a prueba tu retención: escribe tantas tarjetas como puedas antes de que se acabe el tiempo. ¡Rápido, el cronómetro avanza!',
          gif: '/gif/cronometro/cronometrotarjeta.webm'
        },
        {
          text: 'Prepara tus materiales, analiza la información y crea tarjetas rápidamente. ¡Reta tu capacidad de retención mientras el cronómetro corre!',
          gif: '/gif/cronometro/cronometrotarjeta.webm'
        }
      ]
    },
    {
      id: '3',
      label: 'Rubber Duck',
      gif: '/gif/animacionduck.gif',
      subtitle: [
        'Habla con el patito',
        'Replantear',
        'Encuentra el error',
        'Resumen'
      ],
      pages: [
        {
          text: '<span>Describe</span> cada paso del problema, explicando lo que hace cada parte como si estuvieras enseñándole al patito. Detallar tus ideas puede ayudarte a <span>aclarar</span> tus pensamientos.',
          gif: '/gif/duck/duckchat.webm'
        },
        {
          text: 'Mientras explicas, presta atención a posibles <span>inconsistencias o errores.</span> Si algo no tiene sentido, <span>replantea</span> tu explicación y busca una solución <span>alternativa.</span>',
          gif: '/gif/duck/duckerror.webm'
        },
        {
          text: ' Este ejercicio revela <span>detalles</span> que podrías haber pasado por alto al estudiar un tema complicado',
          gif: '/gif/duck/duckcheck.webm'
        },
        {
          text: 'Explicar, analizar, replantear.',
          gif: '/gif/duck/duck.webm'
        }
      ]
    },
    {
      id: '4',
      label: 'Canva',
      gif: '',
      subtitle: [
        'Elige tu tema central',
        'Encuentra Conceptos Clave',
        'Conectar',
        'Resumen'
      ],
      pages: [
        {
          text: '<span>Investiga</span> en tus libros, apuntes o materiales de referencia. Busca los temas <span>esenciales</span> que necesitas comprender o memorizar para lograr un aprendizaje efectivo.',
          gif: '/gif/general/book1.webm'
        },
        {
          text: '<span>Analiza</span> la información e identifica los puntos clave. <span>Asocia</span> estos conceptos con <span>imágenes</span> que representen visualmente cada idea.',
          gif: '/gif/canva/canvasearch.webm'
        },
        {
          text: '<span>Conecta</span> los conceptos entre sí para generar <span>relaciones</span> y comprender cómo se vinculan. Usa flechas o líneas para visualizar estas <span>conexiones.</span>',
          gif: '/gif/canva/canvaconection.webm'
        },
        {
           text: 'Elige un tema central, añade palabras clave, usa colores e imágenes, y organiza la información de manera jerárquica. ¡Un buen mapa mental hace que aprender sea más visual y divertido!',
           gif: '/gif/canva/canva.webm'
        }
      ]
    },
    {
      id: '5',
      label: 'Analogía',
      gif: '',
      subtitle: [
        'Investiga',
        'Crea analogía',
        'Personaliza la analogía',
        'Resumen'
      ],
      pages: [
        {
          text: '<span> Investiga </span> en tus libros, apuntes o materiales de referencia. Busca los temas esenciales que necesitas comprender o memorizar para lograr un aprendizaje efectivo.',
          gif: '/gif/general/book1.webm'
        },
        {
          text: 'Piensa en una <span> analogía </span> que explique el concepto original de manera <span> sencilla. </span> Relaciona estos conceptos con <span>imágenes</span> que representen la analogía.',
          gif: '/gif/comic/comicsearch.webm'
        },
        {
          text: 'Crea un <span>cómic</span> que describa la analogía. Añade <span>imágenes</span> y un <span>título</span> que explique el concepto o la historia detrás de la analogía.',
          gif: '/gif/comic/comichoja.webm'
        },
        {
          text: 'Investiga, imagina, relaciona y crea una historia que conecte los conceptos de manera visual y memorable.',
          gif: '/gif/comic/comic.webm'
        }
      ]
    }
  ];


  const modesPerPage = 3;
  const totalPages = Math.ceil(modes.length / modesPerPage);



  const handleContainerClick = (cardId) => {
    setSelectedCard(cardId);
    console.log("selecciodddn", selectedCard)
  };

  const handleCancelar = () => {
    navigate("/")
  }

  const handleConfirm = () => {
    console.log("selected", selectedCard);
    // Usa isTutorialMode para condicionar la navegación
    if (selectedCard === "0" || selectedCard === "10" || selectedCard === "11" || selectedCard === "12") {
      navigate(`/deck/${params.id}/${params.deckid}/new/card/${selectedCard}`, { state: isTutorialMode });
    } else if (selectedCard === "1") {
      console.log("logro")
      navigate(`/deck/${params.id}/${params.deckid}/achievement`, { state: isTutorialMode });
    } else if (selectedCard === "2") {
      navigate(`/deck/${params.id}/${params.deckid}/clock`, { state: isTutorialMode });
    } else if (selectedCard === "3") {
      navigate(`/deck/${params.id}/${params.deckid}/duck`, { state: isTutorialMode });
    }
    else if (selectedCard === "4") {
      navigate(`/deck/${params.id}/${params.deckid}/canva`, { state: isTutorialMode });
    }
    else if (selectedCard === "5") {
      navigate(`/deck/${params.id}/${params.deckid}/analogia`, { state: isTutorialMode });
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
          <div className="modal-content-help">
            <h1 className="title-help-modal">{information_modes[modalHelpId].label}</h1>

            <video
              src={information_modes[modalHelpId].pages[modalCarouselIndex].gif}
              className="img-modal-help"
              autoPlay
              loop
              muted
            >
              <source
                src={information_modes[modalHelpId].pages[modalCarouselIndex].gif}
                type="video/webm"
              />
              Tu navegador no soporta este video.
            </video>

            <h4 className="subtitle-help-mode">
              {information_modes[modalHelpId].subtitle[modalCarouselIndex]}
            </h4>

            {/* Mostrar el texto de la página actual */}
            <p
              className="text-modal-help"
              dangerouslySetInnerHTML={{
                __html: information_modes[modalHelpId].pages[modalCarouselIndex].text,
              }}
            />

            {/* Botones de navegación entre las páginas */}
            <button
              className="prev-button-help"
              onClick={handleModalPrevPage}
              disabled={modalCarouselIndex === 0}
            >
              <GoChevronLeft />
            </button>
            <button
              className="next-button-help"
              onClick={handleModalNextPage}
              disabled={modalCarouselIndex === information_modes[modalHelpId].pages.length - 1}
            >
              <GoChevronRight />
            </button>

            {/* Checkbox para seleccionar modo tutorial */}
            <label className="tutorial-checkbox">
              <input
                type="checkbox"
                checked={isTutorialMode}
                onChange={(e) => setIsTutorialMode(e.target.checked)}
              />
              Modo tutorial
            </label>

            {/* Botón para crear */}
            <button className="crear-button-modal" onClick={handleConfirm}>
              Crear
            </button>

            <button className="close-modal-help" onClick={() => setIsModalOpen(false)}>
              X
            </button>
            <div className="circles-content-mode">
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
        {currentModes.map((mode, index) => (
          mode.id == 0 ? (
            // Estilos y contenido único para el primer elemento
            <div
              key={mode.id}
              className={`tile-mode-grid ${selectedCard === mode.id ? 'selected' : ''}`}
              onClick={() => handleContainerClick(mode.id)}
            >
              <div className='tile-buttons-cont'>
                <div className={`tile-button-mode ${selectedCard === 10 ? 'selected' : ''}`} onClick={(e) => {
                  e.stopPropagation();
                  handleContainerClick(10);
                }}><img className="img-button-modes" src='/img/modes/twitter.webp' alt='twitter logo' /></div>
                <div className={`tile-button-mode ${selectedCard === 11 ? 'selected' : ''}`} onClick={(e) => {
                  e.stopPropagation();
                  handleContainerClick(11);
                }}><img className="img-button-modes" src='/img/modes/mamut.webp' alt='twitter logo' /></div>
                <div className={`tile-button-mode ${selectedCard === 12 ? 'selected' : ''}`} onClick={(e) => {
                  e.stopPropagation();
                  handleContainerClick(12);
                }}><img className="img-button-modes" src='/img/modes/mensaje.webp' alt='twitter logo' /></div>
              </div>
              <button className='help-mode-button' onClick={(e) => {
                handleContainerClick(mode.id);
                handleHelpMode(e, startIndex + 1, mode.id);
              }}>?</button>

              <div className='grid-cont-1'>
                <div className="PruebaAnimation-grid">
                  <img className="imagen-tile-modes img-main-mode" src={mode.img} alt={`${mode.label} mode`} />
                  <label className='label-title-modes title-mode-grid' htmlFor={mode.id}>{mode.label}</label>
                </div>

                <label className='title-mode-grid-2' htmlFor={mode.id}>Sub Modos</label>
              </div>
            </div>
          ) : (
            // Estructura común para los demás elementos
            <div
              key={mode.id}
              className={`tile-mode ${selectedCard === mode.id ? 'selected' : ''}`}
              onClick={() => handleContainerClick(mode.id)}
            >
              <div>
                <input
                  className='radio-mode'
                  type="radio"
                  name="card"
                  id={mode.id}
                  checked={selectedCard === mode.id}
                  onChange={() => { }}
                />
              </div>

              <button className='help-mode-button' onClick={(e) => {
                handleHelpMode(e, startIndex + 1, mode.id);
                handleContainerClick(mode.id);
              }}>?</button>

              <div className="PruebaAnimation">
                <img className="imagen-tile-modes" src={mode.img} alt={`${mode.label} mode`} />
              </div>

              <label className='label-title-modes' htmlFor={mode.id}>{mode.label}</label>
            </div>
          )
        ))}
      </article>
      <footer className="buttons-confirm">
        {currentPage !== 0 && (
          <Button className="prev-mode" onClick={handlePrevPage}>
            Anterior
          </Button>
        )
        }
        <div className='buttons-confirm-mode'>
          <Button className={"buttons-aprove-modes"} onClick={handleCancelar}>Cancelar</Button>
          <Button className={"buttons-aprove-modes"} onClick={handleConfirm}>Confirmar</Button>
        </div>
        {currentPage !== totalPages - 1 && (
          <Button className="next-mode" onClick={handleNextPage}>
            Siguiente
          </Button>
        )}
      </footer>
    </>
  );
}
export default CardMode