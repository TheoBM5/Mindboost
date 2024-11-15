
import { Download, Upload, BookOpen } from 'lucide-react';
import React, { useState, useEffect } from 'react';
const Header = ({ onUpload, onDownload }) => {
    const [barOpen, setBarOpen] = useState(false);


    const handleFileUpload = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
    
        try {
          const content = await file.text();
          const projectData = JSON.parse(content);
    
          // // Validate project structure (assuming ProjectValidator.validate exists)
          // ProjectValidator.validate(projectData);
          onUpload(projectData);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
          console.error('Error loading project:', errorMessage);
          alert(`Failed to load project: ${errorMessage}`);
        } finally {
          // Reset the input to allow loading the same file again
          event.target.value = '';
        }
      };
    
      return (
        <header className="cont-header-comic">
          <div className="header-comic">
            <div className="logo-comic" onClick={() => setBarOpen(!barOpen)}>
              <BookOpen size={32} />
              <h1 className="title-logo-comic">Mindboost</h1>
            </div>
            <div className="cont-button-comic">
              <button className="button-upload-comic">
                <Upload className="img-upload-comic" size={20} />
                <span>Cargar</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="input-header-comic"
                />
              </button>
              <button
                onClick={onDownload}
                className="button-download-comic"
              >
                <Download className="img-upload-comic" size={20} />
                <span>Descargar</span>
              </button>
            </div>
          </div>
        </header>
      );
    };
export default Header