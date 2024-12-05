import { Router } from 'express';
import {
    getPronosticos,
    getPronosticoById,
    createPronostico,
    updatePronostico,
    deletePronostico,
} from '../controladores/pronostico.controller.js';

const router = Router();

router.get('/', getPronosticos);
router.get('/:id', getPronosticoById);
router.post('/', createPronostico);
router.put('/:id', updatePronostico);
router.delete('/:id', deletePronostico);

export default router;
