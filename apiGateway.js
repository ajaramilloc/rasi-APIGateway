const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Ruta específica para el servicio de urgencias
app.get('/api/urgencias/documentos', async (req, res) => {
    try {
        // Importación dinámica de node-fetch
        const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

        const url = 'http://localhost:8080/api/urgencias/documentos';
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Respuesta no exitosa del servicio de urgencias');
        }
        const data = await response.json();

        res.json(data);
    } catch (error) {
        res.status(500).send('Error al comunicarse con el servicio de urgencias.');
    }
});

app.listen(port, () => {
    console.log(`API Gateway escuchando en http://localhost:${port}`);
});
