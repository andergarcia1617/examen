import { conmysql } from '../db.js';

// Obtener todos los resultados
export const getResultados = async (req, res) => {
    try {
        const [rows] = await conmysql.query('SELECT * FROM resultado');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener resultados', error });
    }
};

// Obtener resultado por ID
export const getResultadoById = async (req, res) => {
    try {
        const [rows] = await conmysql.query('SELECT * FROM resultado WHERE id_resultado = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Resultado no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener resultado', error });
    }
};

// Crear un resultado
export const createResultado = async (req, res) => {
    try {
        const { id_partido, resultado_final } = req.body;
        const [result] = await conmysql.query(
            'INSERT INTO resultado (id_partido, resultado_final) VALUES (?, ?)',
            [id_partido, resultado_final]
        );
        res.status(201).json({ id: result.insertId, id_partido, resultado_final });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear resultado', error });
    }
};

// Actualizar un resultado
export const updateResultado = async (req, res) => {
    try {
        const { id_partido, resultado_final } = req.body;
        const [result] = await conmysql.query(
            'UPDATE resultado SET id_partido = ?, resultado_final = ? WHERE id_resultado = ?',
            [id_partido, resultado_final, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Resultado no encontrado' });
        res.json({ id: req.params.id, id_partido, resultado_final });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar resultado', error });
    }
};

// Eliminar un resultado
export const deleteResultado = async (req, res) => {
    try {
        const [result] = await conmysql.query('DELETE FROM resultado WHERE id_resultado = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Resultado no encontrado' });
        res.json({ message: 'Resultado eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar resultado', error });
    }
};
