import React, { useState, useEffect, useRef } from 'react';
import { Trash2 } from 'lucide-react';
import Frame from './Frame';
import "./Comic.css";

const Sheet = ({ id, frames, onRemove, onUpdate, selectedTool }) => {
  const [selectedFrameId, setSelectedFrameId] = useState(null);
  const [containerBounds, setContainerBounds] = useState(new DOMRect(0, 0, 0, 0));
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

  return (
    <div className="cont-sheet">
      <h2 className="title-hoja">Hoja {id}</h2>
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
      <button
        onClick={addFrame}
        className="button-add-sheet"
      >
        Add Frame
      </button>
    </div>
  );
};

export default Sheet;