import { conmysql } from '../db.js';
import bcrypt from 'bcryptjs';

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
        const [rows] = await conmysql.query('SELECT * FROM usuario WHERE id_usr = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario', error });
    }
};

// Crear un usuario
export const createUsuario = async (req, res) => {
    try {
        const { cedula, nombres, usuario, clave, per_id } = req.body;
        const hashedPassword = await bcrypt.hash(clave, 10);  // Hashear la contraseña
        const [result] = await conmysql.query('INSERT INTO usuario (cedula, nombres, usuario, clave, per_id) VALUES (?, ?, ?, ?, ?)', [cedula, nombres, usuario, hashedPassword, per_id]);
        res.status(201).json({ id_usr: result.insertId, cedula, nombres, usuario, per_id });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario', error });
    }
};

// Iniciar sesión de usuario (autenticación)
export const loginUsuario = async (req, res) => {
    const { usuario, clave } = req.body;

    try {
        // Consultar usuario por nombre de usuario
        const [rows] = await conmysql.query('SELECT * FROM usuario WHERE usuario = ?', [usuario]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const user = rows[0];
        
        // Verificar si la contraseña coincide
        const isMatch = await bcrypt.compare(clave, user.clave);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Retornar la información del usuario si la autenticación es exitosa
        res.json({
            message: 'Login exitoso',
            id_usr: user.id_usr,
            nombres: user.nombres,
            tipo_usuario: user.per_id  // Información adicional para el frontend
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el inicio de sesión', error });
    }
};

// Actualizar un usuario
export const updateUsuario = async (req, res) => {
    try {
        const { cedula, nombres, usuario, per_id } = req.body;
        const [result] = await conmysql.query('UPDATE usuario SET cedula = ?, nombres = ?, usuario = ?, per_id = ? WHERE id_usr = ?', [cedula, nombres, usuario, per_id, req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ id_usr: req.params.id, cedula, nombres, usuario, per_id });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario', error });
    }
};

// Eliminar un usuario
export const deleteUsuario = async (req, res) => {
    try {
        const [result] = await conmysql.query('DELETE FROM usuario WHERE id_usr = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario', error });
    }
};
