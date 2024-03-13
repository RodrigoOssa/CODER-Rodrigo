import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import __dirname from './path.js';
import routes from "./routes/views.routes.js";
import ThingsManager from "./dao/ThingsManager.js";
import mongoose from "mongoose";

const credentials = {
    pass: "dzODkx9YPceycYt7"
}

const productos = new ThingsManager(__dirname + "/data/products.json");
const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log("Server escuchando puerto " + PORT))
const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.engine('handlebars', engine({ defaultLayout: false }));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use('/', routes);

mongoose.connect(`mongodb+srv://rodrigoo2012r:${credentials.pass}@ecommerce.nkxjpdn.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce`)
    .then(() => console.log("OK"))
    .catch(err => console.log(err))

socketServer.on('connection', async socket => {
    let products = await productos.getThings()
    console.log("Nuevo cliente conectado");

    socketServer.emit('listaProductos', products)

    socket.on('nuevoProducto', (dato) => {
        console.log(dato)
        socketServer.emit('listaProductos', dato)
    })

    socket.on('deleteProducto', (dato) => {
        console.log("Producto eliminado")
        socketServer.emit('listaProductos', dato)
    })
})

export { productos, socketServer };