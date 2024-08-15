import { exec } from 'child_process';
import path from 'path';

export const runPythonScript = (req, res) => {
  const { args } = req.body;
  const formattedArgs = args.join(' ');
  // const scriptPath = "./src/scripts/three_script.py"
  const command = `docker run --rm my-python-predictor python three_script.py ${formattedArgs}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('Error ejecutando el script de Python:', error);
      return res.status(500).json({ error: 'Error ejecutando el script de Python' });
    }
    if (stderr) {
      console.error('Error en el script de Python:', stderr);
      return res.status(500).json({ error: 'Error en el script de Python' });
    }
    if (!stdout || stdout.trim() === '') {
      console.error('No se recibió ninguna salida del script de Python');
      return res.status(500).json({ error: 'No se recibió ninguna salida del script de Python' });
    }

    // Asegúrate de que stdout contenga un valor válido
    try {
      const result = stdout.trim();
      res.json({ prediction: result });
    } catch (err) {
      console.error('Error procesando la salida del script de Python:', err);
      res.status(500).json({ error: 'Error procesando la salida del script de Python' });
    }
  });
};