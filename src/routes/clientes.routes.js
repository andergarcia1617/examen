import { Router } from 'express';
import {
    getClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente,
    getClientesByTrabajador
} from '../controladores/clientes.controller.js';

const router = Router();

// Obtener todos los clientes
router.get('/clientes', getClientes);

// Obtener un cliente por cédula
router.get('/clientes/:cedula', getClienteById);

// Crear un nuevo cliente
router.post('/clientes', createCliente);

// Actualizar un cliente existente
router.put('/clientes/:cedula', updateCliente);

// Eliminar un cliente
router.delete('/clientes/:cedula', deleteCliente);

router.get('/clientes/trabajador/:trabajadorId', getClientesByTrabajador);

export default router;
