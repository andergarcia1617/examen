import { Router } from 'express';
import {
    getPerfiles,
    getPerfilById,
    createPerfil,
    updatePerfil,
    deletePerfil,
} from '../controladores/perfil.controller.js';

const router = Router();

router.get('/', getPerfiles);
router.get('/:id', getPerfilById);
router.post('/', createPerfil);
router.put('/:id', updatePerfil);
router.delete('/:id', deletePerfil);

export default router;
