import {Card, Input, TextArea, Button, Label} from "../../components/ui/index";
import {useForm} from "react-hook-form";
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { ICON_NAMES } from "../../constants/icon"; 
import axios from 'axios';
import ModalCrop from "../ImageRecorte/ModalCrop";
import { useCards } from "../../context/CardContext";
import { CiImageOn, CiUser, CiCircleList  } from "react-icons/ci";
import './Logro.css';
function Logro() {
  const {register, handleSubmit, reset, formState: {errors}, setValue} = useForm ();
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
        // Crear una instancia de FormData
        const imageFormData = new FormData();
        imageFormData.append('file', ImageLogro.current);
        imageFormData.append('upload_preset', 'Preset_react');
        
        // // Subir la imagen a Cloudinary
        const response = await axios.post('https://api.cloudinary.com/v1_1/dwnhr8bue/image/upload', imageFormData);
        const imageUrl = response.data.secure_url;
        delete formData.icon;
      
        data = { ...formData, imageUrl };
      }
      else{
        data = { ...formData};
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

  

  return (
    <div className="page-logro-container">

        <Card className={"logro-style-card"}>
                <form className="logro-content" onSubmit={onSubmit} autoComplete="off">
                <div className="text-area-logro-cont">
                  <Label>Descripcion</Label>
                  <div className="buttons">
                    <button onClick={handleNumberLines}><CiCircleList /></button>
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
                        <p className="error-message">Description text is required</p>
                    )}
                </div>
                <div className="label-container-logro">
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
                  <p className="error-message">Hace falta la imagen o icono. Estado del icono: {ImageLogro.current || 'No seleccionado'}</p>
                )}
                      </div>
                      <button type="button" className="icon-logro-up" onClick={handleButtonClick}><CiUser className="icon-buttom-logro"/></button>
                      <button type="button" className="image-logro-up" onClick={() => setModalOpen(true)}><CiImageOn className="icon-buttom-logro"/></button>
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
                  
                  <Input className="input-logro"
                  {...register("front",{
                    required: true,
                })}
                />
                {errors.front && (
                        <p className="error-message">title text is required</p>
                )}
                </div>
                <footer className="button-aplicar-contenedor">
                  <button type="submit" className="button-logro">Aplicar</button>
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
                          <button type="button" className="button-new-logro" onClick={handleNewLogro}>Nueva</button>
                          <button className="button-terminar-logro" onClick={handleFinalSubmit}>Terminar</button>
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