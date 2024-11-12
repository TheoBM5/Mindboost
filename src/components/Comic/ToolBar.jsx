import React from 'react';
import { Move, RotateCw, Maximize2, Image, Trash2 } from 'lucide-react';
import "./Comic.css";

const Toolbar = ({ selectedTool, onToolSelect }) => {
  const tools = [
    { type: 'move', icon: <Move size={24} />, tooltip: 'Move' },
    { type: 'rotate', icon: <RotateCw size={24} />, tooltip: 'Rotate' },
    { type: 'resize', icon: <Maximize2 size={24} />, tooltip: 'Resize' },
    { type: 'image', icon: <Image size={24} />, tooltip: 'Add Image' },
    { type: 'delete', icon: <Trash2 size={24} />, tooltip: 'Delete' },
  ];

  return (
    <div className="tool-cont-comic">
      {tools.map(({ type, icon, tooltip }) => (
        <button
          key={type}
          onClick={() => onToolSelect(type)}
          className={`button-tool-comic
            ${selectedTool === type 
              ? 'bg-blue-500 text-white transform scale-110' 
              : 'bg-white hover:bg-gray-100'}`}
        >
          {icon}
          <span className="tool-span">
            {tooltip}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Toolbar;