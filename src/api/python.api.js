import axios from './axios.js';

export const runPythonScript = async (args) => {
  try {
    const response = await axios.post('/run-python', {
      args,
    }, {
      withCredentials: true, // Esto es necesario si estás usando cookies para la autenticación
    });
    return response.data.prediction;
  } catch (error) {
    console.error('Error ejecutando el script de Python:', error);
    throw error;
  }
};