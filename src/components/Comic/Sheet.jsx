import React, { useState, useEffect, useRef } from 'react';
import { Trash2 } from 'lucide-react';
import Frame from './Frame';
import {useForm} from "react-hook-form";
import { useNavigate, useParams, useLocation  } from "react-router-dom";
import { useCards } from "../../context/CardContext";
import { Buton, Button, Input, Label } from "../../components/ui/index";
import { uploadImage } from "../../utils/uploadImage"; 

import "./Comic.css";
import html2canvas from 'html2canvas'; 

const Sheet = ({ id, frames, onRemove, onUpdate, selectedTool }) => {
  const [selectedFrameId, setSelectedFrameId] = useState(null);
  const {register, handleSubmit, reset, formState: {errors}, setValue} = useForm ();
  const [containerBounds, setContainerBounds] = useState(new DOMRect(0, 0, 0, 0));
  const {createCard, updateCard, loadCard, errors: CardErrors} = useCards();
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const updateBounds = () => {
      if (containerRef.current) {
        setContainerBounds(containerRef.current.getBoundingClientRect());
      }
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  const addFrame = () => {
    const newFrame = {
      id: Date.now(),
      x: 8,
      y: 8,
      width: 200,
      height: 200,
    };
    onUpdate([...frames, newFrame]);
    setSelectedFrameId(newFrame.id);
  };

  const updateFrame = (frameId, updates) => {
    onUpdate(frames.map(frame => 
      frame.id === frameId ? { ...frame, ...updates } : frame
    ));
  };

  const removeFrame = (frameId) => {
    onUpdate(frames.filter(frame => frame.id !== frameId));
    setSelectedFrameId(null);
  };

  const handleSheetClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedFrameId(null);
    }
  };


  const onExport = async (title) => {
    let dataUrl;
    let imageUrl = null; 
    if (containerRef.current) {
      try {
        const canvas = await html2canvas(containerRef.current, {
          backgroundColor: null,
        });
        dataUrl = canvas.toDataURL('image/png'); 
      } catch (error) {
        console.error("Error generating canvas:", error);
        return; 
      }
    }
  

    try {
      if (dataUrl) {
        imageUrl = await uploadImage(dataUrl);  
       
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  

    const cardData = {
      title: title,
      imageUrl: imageUrl,
    };
  
    // Crear la tarjeta
    try {
      const deck = await createCard(params.deckid, cardData, params.id, 9); 
      navigate("/"); 
    } catch (error) {
      console.error("Error saving card:", error);
    }
  };

  const onSubmit = (formData) => {
    const { title } = formData;
    onExport(title); 
  };



  return (
    <div className="cont-sheet">
      <header className='header-analogy'>
        <Label>Titulo</Label>
        <form  onSubmit={onSubmit}>
              <Input 
                
                {...register("title", {
                  required: true,
                })}
              />
              {errors.title && (
                <p className="error-message">El título es obligatorio</p>
              )}
              
            </form>
      </header>
      <button
        onClick={onRemove}
        className="button-remove-hoja"
      >
        <Trash2 size={20} />
      </button>
      <div 
        ref={containerRef}
        className="space-hoja"
        onClick={handleSheetClick}
      >
        {frames.map(frame => (
          <Frame
            key={frame.id}
            {...frame}
            onUpdate={(updates) => updateFrame(frame.id, updates)}
            onRemove={() => removeFrame(frame.id)}
            isSelected={frame.id === selectedFrameId}
            onSelect={() => setSelectedFrameId(frame.id)}
            selectedTool={selectedTool}
            containerBounds={containerBounds}
          />
        ))}
      </div>
      <footer className='footer-analogy'>
        <button
          onClick={addFrame}
          className="button-add-frame"
        >
        Frame
        </button>
        <button
          onClick={handleSubmit(onSubmit)}
          className="button-add-frame"
        >
        Terminar
        </button>

      </footer>
    </div>
  );
};

export default Sheet;