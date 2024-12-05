import { conmysql } from '../db.js';

// Obtener todos los trabajadores
export const getTrabajadores = async (req, res) => {
  try {
    const [trabajadores] = await conmysql.execute('SELECT * FROM tb_trabajador'); // Cambiado a conmysql.execute

    if (trabajadores.length > 0) {
      res.json(trabajadores); // Devolver los trabajadores encontrados
    } else {
      res.status(404).json({ message: 'No se encontraron trabajadores.' });
    }
  } catch (error) {
    console.error('Error al obtener trabajadores:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};