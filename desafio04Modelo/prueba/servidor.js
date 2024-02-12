import express from 'express';
import router from './router.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router);
console.log("Ruta: ", dirname(fileURLToPath(import.meta.url)))

app.listen(8080, () => console.log("Servidor escuchando puerto 8080"))