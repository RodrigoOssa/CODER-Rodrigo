import express from 'express';
import productsRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartsRouter.js';


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(productsRouter);
app.use(cartRouter);

app.listen(PORT, () => console.log("Servidor a la escucha en puerto " + PORT))
