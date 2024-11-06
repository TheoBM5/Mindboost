import React, { useState, useRef, useEffect } from "react";
import { Excalidraw, exportToCanvas,
  exportToSvg,
  exportToBlob,
  exportToClipboard,
  
    } from "@excalidraw/excalidraw";
import "./ExcalidrawComp.css";
import {useForm} from "react-hook-form";
import { useCards } from "../../context/CardContext";
import { Buton, Button, Input, Label } from "../../components/ui/index";

function ExcalidrawComp() {
  const [canvasUrl, setCanvasUrl] = useState("");
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [modal, setModal] = useState(false);
  const {createCard, updateCard, loadCard, errors: CardErrors} = useCards();
  const {register, handleSubmit, reset, formState: {errors}, setValue} = useForm ();
  const onExport = async (type) => {
    setModal(true);
    if (!excalidrawAPI) {
      return false;
    }

    let blob;
    if (type === "png") {
      const canvas = await exportToCanvas({
        elements: excalidrawAPI.getSceneElements(),
        appState: excalidrawAPI.getAppState(),
        files: excalidrawAPI.getFiles(),
      });
      blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    } else if (type === "svg") {
      const svg = await exportToSvg({
        elements: excalidrawAPI.getSceneElements(),
        appState: excalidrawAPI.getAppState(),
        files: excalidrawAPI.getFiles(),
      });
      blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
    } else if (type === "json") {
      const json = JSON.stringify({
        elements: excalidrawAPI.getSceneElements(),
        appState: excalidrawAPI.getAppState(),
        files: excalidrawAPI.getFiles(),
      });
      blob = new Blob([json], { type: "application/json" });
    }

    // Convert the blob to a URL and set it to display the image
    const url = URL.createObjectURL(blob);
    setCanvasUrl(url);
    console.log(canvasUrl)
  };

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);
    console.log("hola");
  });


  return (
    <>
    <div>
            <button className="button-export-canva" onClick={onExport.bind(null, "png")}>
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
        excalidrawAPI={(api) => setExcalidrawAPI(api)} // Using API prop to access the Excalidraw API
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
              <Button type="submit" className={"button-canva-export"} onClick={onSubmit}>
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
