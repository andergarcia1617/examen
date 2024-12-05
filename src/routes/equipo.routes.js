import { Router } from 'express';
import {
    getEquipos,
    getEquipoById,
    createEquipo,
    updateEquipo,
    deleteEquipo,
} from '../controladores/equipo.controller.js';

const router = Router();

router.get('/', getEquipos); // Obtener todos los equipos
router.get('/:id', getEquipoById); // Obtener un equipo por ID
router.post('/', createEquipo); // Crear un nuevo equipo
router.put('/:id', updateEquipo); // Actualizar un equipo
router.delete('/:id', deleteEquipo); // Eliminar un equipo

export default router;
