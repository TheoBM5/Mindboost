import { Router } from 'express';
import { runPythonScript } from '../controllers/python.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js'; // Si es necesario

const router = Router();

router.post('/run-python', isAuth, runPythonScript); // Asegúrate de usar isAuth si necesitas autenticación

export default router;