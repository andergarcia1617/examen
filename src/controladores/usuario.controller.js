import { conmysql } from '../db.js';

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
    try {
        const [rows] = await conmysql.query('SELECT * FROM usuario');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
};

// Obtener usuario por ID
export const getUsuarioById = async (req, res) => {
    try {
        const [rows] = await conmysql.query('SELECT * FROM usuario WHERE id_usuario = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario', error });
    }
};

// Crear un usuario
export const createUsuario = async (req, res) => {
    try {
        const { nombre, correo } = req.body;
        const [result] = await conmysql.query('INSERT INTO usuario (nombre, correo) VALUES (?, ?)', [nombre, correo]);
        res.status(201).json({ id: result.insertId, nombre, correo });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario', error });
    }
};

// Actualizar un usuario
export const updateUsuario = async (req, res) => {
    try {
        const { nombre, correo } = req.body;
        const [result] = await conmysql.query('UPDATE usuario SET nombre = ?, correo = ? WHERE id_usuario = ?', [nombre, correo, req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ id: req.params.id, nombre, correo });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario', error });
    }
};

// Eliminar un usuario
export const deleteUsuario = async (req, res) => {
    try {
        const [result] = await conmysql.query('DELETE FROM usuario WHERE id_usuario = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario', error });
    }
};
