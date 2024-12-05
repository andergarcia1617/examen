import { conmysql } from '../db.js';

// Obtener todos los partidos
export const getPartidos = async (req, res) => {
    try {
        const [rows] = await conmysql.query('SELECT * FROM partido');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener partidos', error });
    }
};

// Obtener partido por ID
export const getPartidoById = async (req, res) => {
    try {
        const [rows] = await conmysql.query('SELECT * FROM partido WHERE id_partido = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Partido no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener partido', error });
    }
};

// Crear un partido
export const createPartido = async (req, res) => {
    try {
        const { equipo_local, equipo_visitante, fecha } = req.body;
        const [result] = await conmysql.query('INSERT INTO partido (equipo_local, equipo_visitante, fecha) VALUES (?, ?, ?)', [equipo_local, equipo_visitante, fecha]);
        res.status(201).json({ id: result.insertId, equipo_local, equipo_visitante, fecha });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear partido', error });
    }
};

// Actualizar un partido
export const updatePartido = async (req, res) => {
    try {
        const { equipo_local, equipo_visitante, fecha } = req.body;
        const [result] = await conmysql.query('UPDATE partido SET equipo_local = ?, equipo_visitante = ?, fecha = ? WHERE id_partido = ?', [equipo_local, equipo_visitante, fecha, req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Partido no encontrado' });
        res.json({ id: req.params.id, equipo_local, equipo_visitante, fecha });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar partido', error });
    }
};

// Eliminar un partido
export const deletePartido = async (req, res) => {
    try {
        const [result] = await conmysql.query('DELETE FROM partido WHERE id_partido = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Partido no encontrado' });
        res.json({ message: 'Partido eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar partido', error });
    }
};
