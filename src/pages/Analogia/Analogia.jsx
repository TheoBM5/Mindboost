import React, { useState } from 'react';
import { Plus, Minus, Upload, Move, RotateCw, Maximize2 } from 'lucide-react';
import Sheet from "../../components/Comic/Sheet";
import Toolbar from "../../components/Comic/ToolBar";
import Header from "../../components/Comic/Header";
import "./Analogia.css";

function Analogia() {
  const [sheets, setSheets] = useState([{ id: 1, frames: [] }]);
  const [selectedTool, setSelectedTool] = useState('move');

  const addSheet = () => {
    setSheets([...sheets, { id: Date.now(), frames: [] }]);
  };

  const removeSheet = (sheetId) => {
    setSheets(sheets.filter(sheet => sheet.id !== sheetId));
  };

  const handleDownload = () => {
    try {
      const project = {
        sheets,
        version: '1.0.0',
      };

      const data = JSON.stringify(project, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `comic-book-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error saving project:', errorMessage);
      alert(`Failed to save project: ${errorMessage}`);
    }
  };

  const handleUpload = (project) => {
    try {
      setSheets(project.sheets);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error applying project:', errorMessage);
      alert(`Failed to apply project: ${errorMessage}`);
    }
  };

  return (
    <div className="cont-analogia">
      <Header onUpload={handleUpload} onDownload={handleDownload} />
      <main className="main-analogia">
        <Toolbar selectedTool={selectedTool} onToolSelect={setSelectedTool} />
        <div className="cont-hoja-analogia">
          <div className="hoja-analogia">
            {sheets.map(sheet => (
              <Sheet 
                key={sheet.id} 
                id={sheet.id} 
                frames={sheet.frames}
                onRemove={() => removeSheet(sheet.id)}
                onUpdate={(updatedFrames) => {
                  setSheets(sheets.map(s => 
                    s.id === sheet.id ? { ...s, frames: updatedFrames } : s
                  ));
                }}
                selectedTool={selectedTool}
              />
            ))}
            <button
              onClick={addSheet}
              className="button-add-sheet"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analogia