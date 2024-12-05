import { conmysql } from '../db.js'

// Obtener todos los equipos
export const getEquipos = async (req, res) => {
    try {
        const [rows] = await conmysql.query('SELECT * FROM equipo');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener equipos', error });
    }
};

// Obtener equipo por ID
export const getEquipoById = async (req, res) => {
    try {
        const [rows] = await conmysql.query('SELECT * FROM equipo WHERE id_eq = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Equipo no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener equipo', error });
    }
};

// Crear un equipo
export const createEquipo = async (req, res) => {
    try {
        const { nombre_eq, ciudad_eq } = req.body;
        const [result] = await conmysql.query('INSERT INTO equipo (nombre_eq, ciudad_eq) VALUES (?, ?)', [nombre_eq, ciudad_eq]);
        res.status(201).json({ id: result.insertId, nombre_eq, ciudad_eq });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear equipo', error });
    }
};

// Actualizar un equipo
export const updateEquipo = async (req, res) => {
    try {
        const { nombre_eq, ciudad_eq } = req.body;
        const [result] = await conmysql.query('UPDATE equipo SET nombre_eq = ?, ciudad_eq = ? WHERE id_eq = ?', [nombre_eq, ciudad_eq, req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Equipo no encontrado' });
        res.json({ id: req.params.id, nombre_eq, ciudad_eq });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar equipo', error });
    }
};

// Eliminar un equipo
export const deleteEquipo = async (req, res) => {
    try {
        const [result] = await conmysql.query('DELETE FROM equipo WHERE id_eq = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Equipo no encontrado' });
        res.json({ message: 'Equipo eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar equipo', error });
    }
};
