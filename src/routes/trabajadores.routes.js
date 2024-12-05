import { Router } from 'express';
import { getTrabajadores } from '../controladores/trabajadores.controller.js';

const router = Router();

// Ruta para obtener todos los trabajadores
router.get('/trabajadores', getTrabajadores);

export default router;
