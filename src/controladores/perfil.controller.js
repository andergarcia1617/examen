import { conmysql } from '../db.js';

// Obtener todos los perfiles
export const getPerfiles = async (req, res) => {
    try {
        const [rows] = await conmysql.query('SELECT * FROM perfil');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener perfiles', error });
    }
};

// Obtener perfil por ID
export const getPerfilById = async (req, res) => {
    try {
        const [rows] = await conmysql.query('SELECT * FROM perfil WHERE id_perfil = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Perfil no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener perfil', error });
    }
};

// Crear un perfil
export const createPerfil = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const [result] = await conmysql.query('INSERT INTO perfil (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion]);
        res.status(201).json({ id: result.insertId, nombre, descripcion });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear perfil', error });
    }
};

// Actualizar un perfil
export const updatePerfil = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const [result] = await conmysql.query('UPDATE perfil SET nombre = ?, descripcion = ? WHERE id_perfil = ?', [nombre, descripcion, req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Perfil no encontrado' });
        res.json({ id: req.params.id, nombre, descripcion });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar perfil', error });
    }
};

// Eliminar un perfil
export const deletePerfil = async (req, res) => {
    try {
        const [result] = await conmysql.query('DELETE FROM perfil WHERE id_perfil = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Perfil no encontrado' });
        res.json({ message: 'Perfil eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar perfil', error });
    }
};
