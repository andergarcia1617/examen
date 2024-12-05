import { conmysql } from '../db.js';

// Obtener todos los pronósticos
export const getPronosticos = async (req, res) => {
    try {
        const [rows] = await conmysql.query('SELECT * FROM pronostico');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener pronósticos', error });
    }
};

// Obtener pronóstico por ID
export const getPronosticoById = async (req, res) => {
    try {
        const [rows] = await conmysql.query('SELECT * FROM pronostico WHERE id_pronostico = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Pronóstico no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener pronóstico', error });
    }
};

// Crear un pronóstico
export const createPronostico = async (req, res) => {
    try {
        const { id_partido, id_usuario, resultado_pronosticado } = req.body;
        const [result] = await conmysql.query(
            'INSERT INTO pronostico (id_partido, id_usuario, resultado_pronosticado) VALUES (?, ?, ?)',
            [id_partido, id_usuario, resultado_pronosticado]
        );
        res.status(201).json({ id: result.insertId, id_partido, id_usuario, resultado_pronosticado });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear pronóstico', error });
    }
};

// Actualizar un pronóstico
export const updatePronostico = async (req, res) => {
    try {
        const { id_partido, id_usuario, resultado_pronosticado } = req.body;
        const [result] = await conmysql.query(
            'UPDATE pronostico SET id_partido = ?, id_usuario = ?, resultado_pronosticado = ? WHERE id_pronostico = ?',
            [id_partido, id_usuario, resultado_pronosticado, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Pronóstico no encontrado' });
        res.json({ id: req.params.id, id_partido, id_usuario, resultado_pronosticado });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar pronóstico', error });
    }
};

// Eliminar un pronóstico
export const deletePronostico = async (req, res) => {
    try {
        const [result] = await conmysql.query('DELETE FROM pronostico WHERE id_pronostico = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Pronóstico no encontrado' });
        res.json({ message: 'Pronóstico eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar pronóstico', error });
    }
};
