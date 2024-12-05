import { Router } from 'express';
import {
    getResultados,
    getResultadoById,
    createResultado,
    updateResultado,
    deleteResultado,
} from '../controladores/resultado.controller.js';

const router = Router();

router.get('/', getResultados);
router.get('/:id', getResultadoById);
router.post('/', createResultado);
router.put('/:id', updateResultado);
router.delete('/:id', deleteResultado);

export default router;
