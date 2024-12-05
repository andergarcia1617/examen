import { conmysql } from '../db.js';  // Asegúrate de que 'conmysql' está correctamente exportado

export const registrarConsumo = async (req, res) => {
  const { cli_cedula, consumo, longitudToma, latitudToma, mes, anio } = req.body;

  // Validar que todos los campos necesarios estén presentes
  if (!cli_cedula || !consumo || !longitudToma || !latitudToma || !mes || !anio) {
    return res.status(400).json({ message: 'Faltan datos necesarios para registrar el consumo.' });
  }

  try {
    // Consulta para insertar el consumo en la base de datos
    const query = `
      INSERT INTO tb_consumo (cli_cedula, consumo, longitudToma, latitudToma, mes, anio)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    // Ejecuta la consulta
    await conmysql.query(query, [cli_cedula, consumo, longitudToma, latitudToma, mes, anio]);

    res.status(201).json({ message: 'Consumo registrado correctamente.' });
  } catch (error) {
    console.error('Error al registrar el consumo:', error);
    res.status(500).json({ message: 'Error en el servidor al registrar el consumo.' });
  }
};
