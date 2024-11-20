import {Card, Input, TextArea, Button, Label} from "../../components/ui/index";
import {useForm} from "react-hook-form";
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams, useLocation  } from "react-router-dom";
import { ICON_NAMES } from "../../constants/icon"; 
import Tutorial from "../../components/Tutorial/Tutorial";
import ModalCrop from "../ImageRecorte/ModalCrop";
import { useCards } from "../../context/CardContext";
import { CiImageOn, CiUser, CiCircleList  } from "react-icons/ci";
import { uploadImage } from "../../utils/uploadImage"; 
import './Logro.css';

const tutorialSteps = [
  { 
    selector: '.text-area-logro-cont', 
    title: 'Descripción', 
    message: 'Escribe aquí los pasos o detalles del procedimiento asociado al logro.' 
  },
  { 
    selector: '.cont-image-logro', 
    title: 'Imagen', 
    message: 'Selecciona una imagen o un ícono que represente este logro.' 
  },
  { 
    selector: '.input-logro', 
    title: 'Título', 
    message: 'Ingresa un título breve y descriptivo para identificar el logro.' 
  },
  { 
    selector: '.button-aplicar-contenedor', 
    title: 'Aplicar', 
    message: 'Usa estos botones para guardar los cambios o regresar al menú anterior.' 
  },
];

function Logro() {
  
  const {register, handleSubmit, reset, formState: {errors}, setValue, clearErrors} = useForm ();
  const [selectedIcon, setSelectedIcon] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [previewAch, setPrevAch] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState('');
  const [iconUploaded, setIconUploaded] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imgLogro, setImgLogro] = useState("");
  const params = useParams();
  const {createCard, updateCard, loadCard, errors: CardErrors} = useCards();
  const hasIdCard = params.hasOwnProperty('idcard');
  const ImageLogro = useRef("");
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const location = useLocation();
  const [isTutorialActive, setIsTutorialActive] = useState(location.state ?? false);
  console.log("tutorial", isTutorialActive)

  const startTutorial = () => setIsTutorialActive(true);
  const endTutorial = () => setIsTutorialActive(false);
  const ImagelogroUpdate = (imgSrc) => {
    ImageLogro.current = imgSrc;
    setValue('icon', imgSrc);
    setImageUploaded(true);
    setIconUploaded(false)
    setSelectedIcon(''); // Reset icon selection
    setImgLogro(ImageLogro.current);
  };

  const handleIconClick = (name) => {
    setValue('icon', name);
    setImageUploaded(false); // Reset image selection
    setIconUploaded(true)
    ImageLogro.current = '';
    setSelectedIcon(name);
    if(iconUploaded)
      {
        setImgLogro(ICON_NAMES[selectedIcon])
        console.log("ren",imgLogro)
        setIsOpen(false);
      }
    setImgLogro(name);
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

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handlePrevAch = (event) => {
    event.preventDefault();
    setPrevAch(true);
  }

  const handlePrevAchClose = (event) => {
    event.preventDefault();
    setPrevAch(false);
  }

  const handleSendLogro = async (formData) => {
    try {
      console.log(formData)
      let data = {};
      if(!iconUploaded){
        const imageUrl = await uploadImage(ImageLogro.current);
        delete formData.icon;
        data = { ...formData, imageUrl };
      } else {
        data = { ...formData };
      }

      // Combinar los datos del formulario con la URL de la imagen
      const deck = await createCard(params.deckid, data, params.id, 3);
      if (deck) {
        console.log(deck);
      }

      alert('Imagen subida y guardada con éxito');
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      alert('Hubo un error al subir la imagen');
    }
  };

  const onSubmit = handleSubmit(async (formData) => {
    setTitle(formData.front);
    setDescription(formData.reverse);
    setPrevAch(true);

  });

  const handleFinalSubmit = (event) => {
    event.preventDefault();
    handleSubmit(handleSendLogro)();
  };

  const handleNewLogro = (event) => {
      event.preventDefault();
      reset();
      setSelectedIcon('');
      setIsOpen(false);
      setModalOpen(false);
      setPrevAch(false);
      setTitle('');
      setDescription('');
      setText('');
      setIconUploaded(false);
      setImageUploaded(false);
      setImgLogro('');
      ImageLogro.current = '';
      handlePrevAchClose()
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      // Verifica si se ha hecho clic fuera del formulario y oculta los errores
      if (!event.target.closest(".logro-content")) {
        clearErrors(); // Limpia todos los errores al hacer clic fuera
      }
    };

    // Agregar el event listener
    document.addEventListener("click", handleClickOutside);

    // Limpiar el event listener al desmontar
    return () => document.removeEventListener("click", handleClickOutside);
  }, [clearErrors]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        console.log("Click afuera, cerrando modal"); // Verificación en consola
        setIsOpen(false);
        
      } else {
        console.log("Click dentro del modal");
      }
    };

    document.addEventListener("mouseup", handleClickOutside); // Cambiamos a "mouseup"
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  const handleback = () =>{
    navigate("/");
}


  return (
    <div className="page-logro-container">
        {isTutorialActive && (
        <Tutorial steps={tutorialSteps} onClose={endTutorial} />
      )}
        <Card className={"logro-style-card"}>
                <form className="logro-content" onSubmit={onSubmit} autoComplete="off">
                <div className="text-area-logro-cont">
                  <div className="title-button">
                    <Label>Descripcion</Label>
                    <div className="list-button-logro">
                      <button onClick={handleNumberLines}><CiCircleList /></button>
                    </div>
                  </div>
                  <TextArea 
                  {...register("reverse",{
                    required: true,
                })}
                  className="text-area-logro" 
                  id="textArea" 
                  value={text} 
                  onChange={(e) => setText(e.target.value)}
                  />
                  {errors.reverse && (
                        <p className="error-message-logro">Descripcion es requerida</p>
                    )}
                </div>
                <div className="first-container-logro">
                    <div className="cont-image-logro">
                      <div className="preview-image-logro" >
                      {imageUploaded && (
                  <img
                    className="img-cont-logro"
                    src={imgLogro}
                    alt="Logro"
                  />
                )}
                {selectedIcon && (
                  React.createElement(ICON_NAMES[selectedIcon], {
                    className: "selected-icon"
                  })
                )}
                <input
                  type="hidden"
                  {...register('icon', { 
                    validate: value => {imgLogro}
                  })}
                  value={selectedIcon || ImageLogro.current}
                />
                {errors.icon && (
                  <p className="error-message-logro">Hace falta la imagen o icono. Estado del icono: {ImageLogro.current || 'No seleccionado'}</p>
                )}
                      </div>
                      <button type="button" className="icon-logro-up" onClick={handleButtonClick}><CiUser className="icon-buttom-logro"/></button>
                      <button type="button" className="image-logro-up" onClick={() => setModalOpen(true)}><CiImageOn className="icon-buttom-logro"/></button>
                    </div>

                    {isOpen &&(
                      <div className="image-box-modal"  ref={modalRef}>
                        {Object.entries(ICON_NAMES).map(([name, Icon]) => (
                        <Icon
                        key={name}
                        className={`menu-iconos ${selectedIcon === name ? 'active' : ''}`}
                        onClick={() => handleIconClick(name)}
                        />
                            ))}
                      </div>
                    )}
                  <div className="title-input-cont">
                  <Label>Titulo</Label>
                  
                  <Input className="input-logro"
                  {...register("front",{
                    required: true,
                  })}
                  />
                  </div>
                {errors.front && (
                        <p className="error-message-logro">El titulo es requerido</p>
                )}
                </div>
                <footer className="button-aplicar-contenedor">
                  <Button type="button" onClick={handleback}>Regresar</Button>
                  <Button type="submit">Aplicar</Button>
                  {previewAch && (
                    <div className="prev-ach-cont">
                      <div className="prev-ach">
                        <div className="cover-ach">
                        {imageUploaded && (
                            <img
                              className="img-cont-logro-cover"
                              src={imgLogro}
                              alt="Logro"
                            />
                          )}
                          {selectedIcon && (
                            React.createElement(ICON_NAMES[selectedIcon], {
                              className: "selected-icon"
                            })
                          )}
                          <button type="button" className="close-prev-ach" onClick={handlePrevAchClose}>X</button>
                          {imageUploaded && (
                            <img
                              className="img-cont-logro-min"
                              src={imgLogro}
                              alt="Logro"
                            />
                          )}
                          {selectedIcon && (
                            React.createElement(ICON_NAMES[selectedIcon], {
                              className: "selected-icon"
                            })
                          )}
                        </div>
                        <div className="text-ach">{title}</div>
                        <button type="button">V</button>
                        <div className="text-description-ach">{description}
                          <Button type="button" className="button-new-logro" onClick={handleNewLogro}>Nueva</Button>
                          <Button className="button-terminar-logro" onClick={handleFinalSubmit}>Terminar</Button>
                        </div>
                      </div>
                    </div>
                  )}
                </footer>
                </form>
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