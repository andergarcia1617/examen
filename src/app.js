import express from 'express';
import cors from 'cors'; // Importar el paquete cors
import datosPersonalesRoutes from './routes/datosPersonalesRoutes.js';

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
app.use('/api', datosPersonalesRoutes); // Base path para las rutas

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found',
    });
});

export default app;
