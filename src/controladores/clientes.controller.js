import { conmysql } from '../db.js';

// Obtener todos los clientes
export const getClientes = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM tb_cliente');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar clientes" });
    }
};

// Obtener cliente por cédula
export const getClienteById = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM tb_cliente WHERE cli_cedula = ?', [req.params.cedula]);
        if (result.length <= 0) return res.status(404).json({ message: "Cliente no encontrado" });
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Crear un nuevo cliente
export const createCliente = async (req, res) => {
    try {
        const { cli_cedula, cli_nombres, cli_apellidos, cli_estado } = req.body;
        const [rows] = await conmysql.query(
            'INSERT INTO tb_cliente (cli_cedula, cli_nombres, cli_apellidos, cli_estado) VALUES (?, ?, ?, ?)',
            [cli_cedula, cli_nombres, cli_apellidos, cli_estado]
        );
        res.send({ id: rows.insertId });
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Actualizar un cliente existente
export const updateCliente = async (req, res) => {
    try {
        const { cedula } = req.params;
        const { cli_nombres, cli_apellidos, cli_estado } = req.body;
        const [result] = await conmysql.query(
            'UPDATE tb_cliente SET cli_nombres = ?, cli_apellidos = ?, cli_estado = ? WHERE cli_cedula = ?',
            [cli_nombres, cli_apellidos, cli_estado, cedula]
        );
        if (result.affectedRows <= 0) return res.status(404).json({ message: "Cliente no encontrado" });
        const [rows] = await conmysql.query('SELECT * FROM tb_cliente WHERE cli_cedula = ?', [cedula]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};



export const getClientesByTrabajador = async (req, res) => {
    const { trabajadorId } = req.params;
  
    try {
      // Consulta para obtener los clientes del trabajador
      const query = `
        SELECT c.cli_cedula, c.cli_nombres, c.cli_apellidos, c.cli_estado
        FROM tb_cliente c
        JOIN tb_medidor m ON c.cli_cedula = m.cli_cedula
        JOIN tb_rutaasignada r ON m.med_id = r.med_id
        WHERE r.tra_cedula = ?
      `;
  
      // Ejecuta la consulta
      const [clientes] = await conmysql.query(query, [trabajadorId]);
  
      if (clientes.length > 0) {
        res.json(clientes);
      } else {
        res.status(404).json({ message: 'No se encontraron clientes para este trabajador.' });
      }
    } catch (error) {
      console.error('Error al obtener clientes:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  };

// Eliminar un cliente
export const deleteCliente = async (req, res) => {
    const { cedula } = req.params;
    const connection = await conmysql.getConnection();
    try {
        await connection.beginTransaction();
        
        // Eliminar registros en tb_medidor que hacen referencia al cliente
        await connection.query('DELETE FROM tb_medidor WHERE cli_cedula = ?', [cedula]);
        
        // Eliminar el cliente de tb_cliente
        const [result] = await connection.query('DELETE FROM tb_cliente WHERE cli_cedula = ?', [cedula]);
        if (result.affectedRows <= 0) return res.status(404).json({ message: "No se pudo eliminar al cliente" });
        
        await connection.commit();
        res.sendStatus(202);
    } catch (error) {
        await connection.rollback();
        return res.status(500).json({ message: "Error del lado del servidor", error });
    } finally {
        connection.release();
    }
};

