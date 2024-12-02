import { conmysql } from '../db.js';

export const getDatosPersonales = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM datos_personales');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar datos personales" });
    }
};

export const getDatosPersonalesById = async (req, res) => {
    try {
        const [result] = await conmysql.query(
            'SELECT * FROM datos_personales WHERE id_datos_personales = ?',
            [req.params.id]
        );
        if (result.length <= 0) return res.status(404).json({
            id_datos_personales: 0,
            message: "Registro no encontrado"
        });
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

export const postDatosPersonales = async (req, res) => {
    try {
        const { usuario_id, nombre_completo, direccion, telefono, fecha_nacimiento } = req.body;
        const [rows] = await conmysql.query(
            'INSERT INTO datos_personales (usuario_id, nombre_completo, direccion, telefono, fecha_nacimiento) VALUES (?, ?, ?, ?, ?)',
            [usuario_id, nombre_completo, direccion, telefono, fecha_nacimiento]
        );
        res.send({
            id: rows.insertId
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

export const putDatosPersonales = async (req, res) => {
    try {
        const { id } = req.params;
        const { usuario_id, nombre_completo, direccion, telefono, fecha_nacimiento } = req.body;
        const [result] = await conmysql.query(
            'UPDATE datos_personales SET usuario_id = ?, nombre_completo = ?, direccion = ?, telefono = ?, fecha_nacimiento = ? WHERE id_datos_personales = ?',
            [usuario_id, nombre_completo, direccion, telefono, fecha_nacimiento, id]
        );

        if (result.affectedRows <= 0) return res.status(404).json({ message: "Registro no encontrado" });

        const [rows] = await conmysql.query('SELECT * FROM datos_personales WHERE id_datos_personales = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

export const patchDatosPersonales = async (req, res) => {
    try {
        const { id } = req.params;
        const { usuario_id, nombre_completo, direccion, telefono, fecha_nacimiento } = req.body;
        const [result] = await conmysql.query(
            `UPDATE datos_personales SET 
                usuario_id = IFNULL(?, usuario_id), 
                nombre_completo = IFNULL(?, nombre_completo), 
                direccion = IFNULL(?, direccion), 
                telefono = IFNULL(?, telefono), 
                fecha_nacimiento = IFNULL(?, fecha_nacimiento) 
             WHERE id_datos_personales = ?`,
            [usuario_id, nombre_completo, direccion, telefono, fecha_nacimiento, id]
        );

        if (result.affectedRows <= 0) return res.status(404).json({ message: "Registro no encontrado" });

        const [rows] = await conmysql.query('SELECT * FROM datos_personales WHERE id_datos_personales = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

export const deleteDatosPersonales = async (req, res) => {
    try {
        const [rows] = await conmysql.query('DELETE FROM datos_personales WHERE id_datos_personales = ?', [req.params.id]);
        if (rows.affectedRows <= 0) return res.status(404).json({ id_datos_personales: 0, message: "No se pudo eliminar el registro" });
        res.sendStatus(202);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};
