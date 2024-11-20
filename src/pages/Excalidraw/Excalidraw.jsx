import React, { useState, useRef, useEffect } from "react";
import { Excalidraw, exportToCanvas,
  exportToSvg,
  exportToBlob,
  exportToClipboard,
  
    } from "@excalidraw/excalidraw";
import "./ExcalidrawComp.css";
import Tutorial from "../../components/Tutorial/Tutorial";
import {useForm} from "react-hook-form";
import { useNavigate, useParams, useLocation  } from "react-router-dom";
import { useCards } from "../../context/CardContext";
import { Buton, Button, Input, Label } from "../../components/ui/index";
import { uploadImage } from "../../utils/uploadImage"; 

const tutorialSteps = [
  { 
    selector: '.canva-config', 
    title: 'Espacio de trabajo', 
    message: 'Este es el lienzo donde puedes agregar imágenes, formas y textos para crear tu diseño.' 
  },
  { 
    selector: '.canva-tools', 
    title: 'Herramientas', 
    message: 'Aquí encontrarás las herramientas necesarias para personalizar tu Canva, como agregar elementos o editar su apariencia.' 
  },
  { 
    selector: '.button-export-canva', 
    title: 'Guardar diseño', 
    message: 'Haz clic aquí para guardar tu Canva una vez que hayas terminado de editarlo.' 
  },
  { 
    selector: '.button-export-canva', 
    title: 'Titulo', 
    message: 'Aquí puedes ver una previsualización de tu diseño y asegurarte de que todo esté como deseas y se le agregua un titulo' 
  }
];



function ExcalidrawComp() {
  const [canvasUrl, setCanvasUrl] = useState("");
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [modal, setModal] = useState(false);
  const {createCard, updateCard, loadCard, errors: CardErrors} = useCards();
  const {register, handleSubmit, reset, formState: {errors}, setValue} = useForm ();
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const [isTutorialActive, setIsTutorialActive] = useState(location.state ?? false);
  console.log("tutorial", isTutorialActive)
  const startTutorial = () => setIsTutorialActive(true);
  const endTutorial = () => setIsTutorialActive(false);

  const onExport = async (title) => {
    setModal(true); 
    if (!excalidrawAPI) {
      return false;
    }
    let imageUrl = null;
    // Exportamos la imagen del canvas (captura de pantalla)
    let blob;
      const canvas = await exportToCanvas({
        elements: excalidrawAPI.getSceneElements(),
        appState: excalidrawAPI.getAppState(),
        files: excalidrawAPI.getFiles(),
      });
    blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    try {
      imageUrl = await uploadImage(blob);  
      console.log("Image URL:", imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      imageUrl = null; 
    }
    
    const cardData = {
      title: title,
      imageUrl: imageUrl,
    };

    try {
      console.log(params.deckid, cardData, params.id);
      const deck = await createCard(params.deckid, cardData, params.id, 8); 
      navigate("/");
    } catch (error) {
      console.error("Error saving card:", error);
    }
  };


  const onSubmit = (formData) => {
    const { title } = formData;
    console.log("Form data submitted", formData);
    onExport(title); 
  };


  return (
    <>
    <div>
    {isTutorialActive && (
        <Tutorial steps={tutorialSteps} onClose={endTutorial} />
      )}
        <button className="button-export-canva" onClick={() => setModal(true)}>
          Terminar
        </button>
          </div>
    <div className="canva-config">
      <Excalidraw
        initialData={{
          elements: [
            {
            
            },
          ],
          appState: {
            zenModeEnabled: true,
            viewBackgroundColor: "#161616",
          },
          scrollToContent: true,
        }}
        excalidrawAPI={(api) => setExcalidrawAPI(api)} 
      />
    </div>
    {modal && (
        <div className="modal_canva_cont">
          <div className="modal-canva">
            <Label className="label-export-canva">Titulo</Label>
            <form className="header-modal-canva" onSubmit={onSubmit}>
              <Input 
                className="input-canva-export"
                {...register("title", {
                  required: true,
                })}
              />
              {errors.title && (
                <p className="error-message">El título es obligatorio</p>
              )}
              <Button className="button-close-modal" onClick={() => setModal(false)}>X</Button>
            </form>
            <img className="img-canva-export" src={canvasUrl} alt="" />
            <div className="cont-button-canva-export">
              <Button className={"button-canva-export"} onClick={() => setModal(false)}>Editar</Button>
              <Button type="submit" className={"button-canva-export"} onClick={handleSubmit(onSubmit)}>
                Terminar
              </Button>
            </div>
          </div>
        </div>
      )}
  </>
);
};

export default ExcalidrawComp;
