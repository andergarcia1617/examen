import { Router } from 'express';
import {
    getDatosPersonales,
    getDatosPersonalesById,
    postDatosPersonales,
    putDatosPersonales,
    patchDatosPersonales,
    deleteDatosPersonales
} from '../controladores/datosPersonalesController.js';

const router = Router();

// Ruta para obtener todos los registros
router.get('/datos_personales', getDatosPersonales);

// Ruta para obtener un registro por ID
router.get('/datos_personales/:id', getDatosPersonalesById);

// Ruta para crear un nuevo registro
router.post('/datos_personales', postDatosPersonales);

// Ruta para actualizar completamente un registro por ID
router.put('/datos_personales/:id', putDatosPersonales);

// Ruta para actualizar parcialmente un registro por ID
router.patch('/datos_personales/:id', patchDatosPersonales);

// Ruta para eliminar un registro por ID
router.delete('/datos_personales/:id', deleteDatosPersonales);

export default router;
