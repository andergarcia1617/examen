import { Router } from 'express';
import {
    getPartidos,
    getPartidoById,
    createPartido,
    updatePartido,
    deletePartido,
} from '../controladores/partido.controller.js';

const router = Router();

router.get('/', getPartidos);
router.get('/:id', getPartidoById);
router.post('/', createPartido);
router.put('/:id', updatePartido);
router.delete('/:id', deletePartido);

export default router;
