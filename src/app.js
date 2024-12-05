import express from 'express';
import cors from 'cors'; // Importar el paquete cors
import equipoRoutes from './routes/equipo.routes.js';
import partidoRoutes from './routes/partido.routes.js';
import perfilRoutes from './routes/perfil.routes.js';
import pronosticoRoutes from './routes/pronostico.routes.js';
import resultadoRoutes from './routes/resultado.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';
const app = express();

// Configuración de CORS
const corsOptions = {
    origin: '*', // Permitir solicitudes desde cualquier origen (puedes restringirlo si es necesario)
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true, // Si necesitas enviar cookies o encabezados de autorización
};

// Middleware
app.use(cors(corsOptions)); // Activar CORS con las opciones configuradas
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Rutas
app.use('/api/equipos', equipoRoutes);
app.use('/api/partidos', partidoRoutes);
app.use('/api/perfiles', perfilRoutes);
app.use('/api/pronosticos', pronosticoRoutes);
app.use('/api/resultados', resultadoRoutes);
app.use('/api/usuarios', usuarioRoutes);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found',
    });
});

export default app;
