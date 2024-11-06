import React, { useState } from 'react';
import Frame from './Frame';

const Sheet = ({ id, onRemove }) => {
  const [frames, setFrames] = useState([]);

  const addFrame = () => {
    const newFrame = {
      id: Date.now(),
      x: 0,
      y: 0,
      width: 200,
      height: 200,
    };
    setFrames([...frames, newFrame]);
  };

  const updateFrame = (frameId, updates) => {
    setFrames(frames.map(frame => frame.id === frameId ? { ...frame, ...updates } : frame));
  };

  const removeFrame = (frameId) => {
    setFrames(frames.filter(frame => frame.id !== frameId));
  };

  return (
    <div className="bg-white border border-gray-300 p-4 mb-4 relative">
      <h2 className="text-xl font-bold mb-2">Sheet {id}</h2>
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
      >
      </button>
      <div className="min-h-[600px] relative border border-dashed border-gray-400 p-2">
        {frames.map(frame => (
          <Frame
            key={frame.id}
            {...frame}
            onUpdate={(updates) => updateFrame(frame.id, updates)}
            onRemove={() => removeFrame(frame.id)}
          />
        ))}
      </div>
      <button
        onClick={addFrame}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Add Frame
      </button>
    </div>
  );
};

export default Sheet;