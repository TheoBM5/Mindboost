import React, { useState, useRef } from 'react';
import { Trash2, Upload, Move, RotateCw, Maximize2 } from 'lucide-react';
import "./Comic.css";

const Frame = ({ id, x, y, width, height, image, onUpdate, onRemove, isSelected, onSelect, selectedTool, containerBounds }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const frameRef = useRef(null);

  const keepInBounds = (newX, newY, newWidth, newHeight) => {
    const padding = 8; // Account for border and padding
    const maxX = containerBounds.width - newWidth - padding;
    const maxY = containerBounds.height - newHeight - padding;

    return {
      x: Math.max(padding, Math.min(newX, maxX)),
      y: Math.max(padding, Math.min(newY, maxY)),
      width: Math.min(newWidth, containerBounds.width - padding * 2),
      height: Math.min(newHeight, containerBounds.height - padding * 2)
    };
  };

  const handleMouseDown = (e) => {
    e.stopPropagation();
    onSelect();

    if (selectedTool === 'move') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - x, y: e.clientY - y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && selectedTool === 'move') {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      const bounds = keepInBounds(newX, newY, width, height);
      onUpdate({ x: bounds.x, y: bounds.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpdate({ image: event.target?.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResize = (e, direction) => {
    if (selectedTool !== 'resize') return;
    
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = width;
    const startHeight = height;
    const startFrameX = x;
    const startFrameY = y;

    const handleMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      let newX = startFrameX;
      let newY = startFrameY;
      let newWidth = startWidth;
      let newHeight = startHeight;

      const minSize = 100;

      if (direction.includes('right')) {
        newWidth = Math.max(minSize, startWidth + dx);
      }
      if (direction.includes('bottom')) {
        newHeight = Math.max(minSize, startHeight + dy);
      }
      if (direction.includes('left')) {
        const proposedWidth = Math.max(minSize, startWidth - dx);
        newX = startFrameX + (startWidth - proposedWidth);
        newWidth = proposedWidth;
      }
      if (direction.includes('top')) {
        const proposedHeight = Math.max(minSize, startHeight - dy);
        newY = startFrameY + (startHeight - proposedHeight);
        newHeight = proposedHeight;
      }

      const bounds = keepInBounds(newX, newY, newWidth, newHeight);
      onUpdate(bounds);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={frameRef}
      className={`frame-cont ${isSelected ? 'frame-cont-active' : 'frame-cont-noactive'}`}
      style={{ 
        left: x, 
        top: y, 
        width, 
        height,
        cursor: selectedTool === 'move' ? 'move' : 'default'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {image && (
        <img
          src={image}
          alt="Frame content"
          className="img-frame"
        />
      )}
      {isSelected && (
        <div className="frame-selected">
          {selectedTool === 'image' && (
            <label className="label-frame">
              <Upload size={16} 
              />
              <input type="file" className="input-frame" onChange={handleImageUpload} accept="image/*" />
            </label>
          )}
          {selectedTool === 'delete' && (
            <button onClick={onRemove} className="button-remove-frame">
              <Trash2 size={16} />
            </button>
          )}
        </div>
      )}
      {isSelected && selectedTool === 'resize' && (
        <>
          <div className="resize-handle top-left" onMouseDown={(e) => handleResize(e, 'top-left')}></div>
          <div className="resize-handle top-right" onMouseDown={(e) => handleResize(e, 'top-right')}></div>
          <div className="resize-handle bottom-left" onMouseDown={(e) => handleResize(e, 'bottom-left')}></div>
          <div className="resize-handle bottom-right" onMouseDown={(e) => handleResize(e, 'bottom-right')}></div>
        </>
      )}
    </div>
  );
};

export default Frame;