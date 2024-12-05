import express from 'express';
import { registrarConsumo } from '../controladores/consumo.controller.js';

const router = express.Router();

// Ruta para registrar el consumo
router.post('/consumo', registrarConsumo);

export default router;
