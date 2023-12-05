const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
let isAuthenticated = false;

app.use(cors());
app.use(express.json());

// Middleware de autenticación
const authenticateMiddleware = (req, res, next) => {
    if (!isAuthenticated) {
        return res.status(401).send('No autorizado. Por favor, realice el login');
    }
    next();
};

// Ruta específica para el servicio de urgencias
app.get('/api/urgencias/documentos', authenticateMiddleware, async (req, res) => {
    try {
        // Importación dinámica de node-fetch
        const fetch = await import('node-fetch');
        
        const url = 'http://localhost:8080/api/urgencias/documentos';
        const response = await fetch.default(url);

        if (!response.ok) {
            throw new Error('Respuesta no exitosa del servicio de urgencias');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error al comunicarse con el servicio de urgencias.');
    }
});

app.post('/api/urgencias', authenticateMiddleware, async (req, res) => {
    try {
        // Importación dinámica de node-fetch
        const fetch = await import('node-fetch');

        const url = 'http://localhost:8080/api/urgencias';
        
        // Obtener datos del cuerpo de la solicitud
        const { id, documento, estado } = req.body;

        const response = await fetch.default(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, documento, estado }),
        });

        if (!response.ok) {
            throw new Error('Respuesta no exitosa del servicio de urgencias');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error al comunicarse con el servicio de urgencias.');
    }
});

// Ruta específica para el servicio de urgencias
app.post('/historias/historia_clinica/', authenticateMiddleware, async (req, res) => {
    try {
        // Importación dinámica de node-fetch
        const fetch = await import('node-fetch');

        const url = 'http://127.0.0.1:8000/historias/historia_clinica/';
        
        // Obtener datos del cuerpo de la solicitud
        const { documento_paciente } = req.body;

        const response = await fetch.default(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ documento_paciente }),
        });

        if (!response.ok) {
            throw new Error('Respuesta no exitosa del servicio de historia clinica');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error al comunicarse con el servicio de historia clinica.');
    }
});

// Ruta para el servicio de login
app.post('/auth/login', async (req, res) => {
    try {
        const fetch = await import('node-fetch');
        const url = 'http://localhost:8080/auth/login';
        const { username, password } = req.body;

        const response = await fetch.default(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Respuesta no exitosa del servicio de login');
        }

        const data = await response.json();
        isAuthenticated = data === true;
        res.json(data);
    } catch (error) {
        res.status(500).send(`Error al comunicarse con el servicio de login: ${error.message}`);
    }
});

//ruta para registrar usuario
app.post('/auth/register', async (req, res) => {
    try {
        const fetch = await import('node-fetch');
        const url = 'http://localhost:8080/auth/register';
        const { username, password, rol } = req.body;

        const response = await fetch.default(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, rol }),
        });

        if (!response.ok) {
            throw new Error('Respuesta no exitosa del servicio de registro');
        }

    } catch (error) {
        res.status(500).send(`Error al comunicarse con el servicio de registro: ${error.message}`);
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`API Gateway escuchando en http://0.0.0.0:${port}`);
});
