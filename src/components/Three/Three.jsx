import React, { useState } from 'react';
import { runPythonScript } from '../../api/python.api';

function Three() {
  const [output, setOutput] = useState('');
  //const [scriptPath, setScriptPath] = useState("./../../backend/src/scripts/main.py"); // Ruta relativa dentro de la carpeta scripts
  const [scriptPath, setScriptPath] = useState("./src/scripts/three_script.py"); // Ruta relativa dentro de la carpeta scripts
  const [args, setArgs] = useState(['hola', 'arg2']); // Argumentos predeterminados

  const handleRunScript = async () => {
    try {
      const result = await runPythonScript(args);
      setOutput(result);
    } catch (error) {
      console.error('Error ejecutando el script de Python:', error);
    }
  };

  return (
    <div>
      <h1>Ejecutar script de Python</h1>
      <div>
        <label>Ruta del Script:</label>
        <input
          type="text"
          value={scriptPath}
          onChange={(e) => setScriptPath(e.target.value)}
        />
      </div>
      <div>
        <label>Argumentos:</label>
        <input
          type="text"
          value={args.join(' ')}
          onChange={(e) => setArgs(e.target.value.split(' '))}
        />
      </div>
      <button onClick={handleRunScript}>Ejecutar</button>
      <pre>{output}</pre>
    </div>
  );
}
export default Three