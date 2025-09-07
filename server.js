import express from 'express';
import controllerRouting from './routes/index';
import dbClient from './utils/db';

/**
 * This project is a summary of back-end concepts:
 * authentication, NodeJS, MongoDB, Redis,
 * pagination and background processing.
 *
 * The objective was to build a simple platform to upload and view files:
 *
 * User authentication via a token
 * List all files
 * Upload a new file
 * Change permission of a file
 * View a file
 * Generate thumbnails for images
 */

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Registramos las rutas
controllerRouting(app);

/**
 * Levantamos el server SOLO cuando MongoDB esté conectado
 */
async function startServer() {
  try {
    await dbClient.client.connect(); // Espera a la conexión de Mongo
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
    });
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err);
    process.exit(1);
  }
}

startServer();

export default app;
