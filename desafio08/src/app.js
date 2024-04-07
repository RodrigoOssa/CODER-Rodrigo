import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import __dirname from './path.js';
import mongoose from "mongoose";
import viewsRoute from "./routes/views.routes.js";
import productRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/carts.routes.js";
import { productModel } from "./dao/models/products.model.js";
/* import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access"; */
import cookieParser from "cookie-parser";
import cookieTest from "./routes/cookieTest.routes.js";
import endpointTest from "./routes/endpointTest.routes.js";
import session from 'express-session';
import sessionR from "./routes/sessionR.routes.js";

const credentials = {
    pass: "dzODkx9YPceycYt7"
}

const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log("Server escuchando puerto " + PORT))
const socketServer = new Server(httpServer);

/* 
*   Usamos el middleware para manejo de sesiones
*/

app.use(session({
    secret: 'secret',
    /**
     *     Resave permite mantener la sesión activa en caso de que la sesión se mantenga inactiva.
     *     Si se deja en false, la sessión morirá en caso de que exista cierto tiempo de inactividad.  
     */
    resave: true,
    /**
     *     SaveUninitialized permite guardar cualquier sessión aún cuando el objeto de sesión no tenga nada pro contener.
     *     Si se deja en false, la sesión no se guardará si el objeto de sesión está vacío al final de la consulta.
     */
    saveUninitialized: true
}))

//Propio de express para mandar y recibir correctamente los datos a través de un JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middleware para renderizar las vistas (handlebars)
app.use(express.static(__dirname + "/public"));
app.engine('handlebars', engine({ defaultLayout: false }));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

//Manejador de las rutas
app.use('/', viewsRoute);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/cookieTest', cookieTest);
app.use('/endpoint', endpointTest);
app.use('/sessions', sessionR);

/* 
* Para agregarle seguridad a las cookies se puede firmar las cookies y detectar si han sido modificadas desde el lado del cliente.
*
* Para ello se utiliza:
*   app.use(cookieParser("MiS3cr3tC0d3"))
*
* Lo que se ahce es configurar la inicialización del cookieparser.
* Solo hace falta agregar un "secret" al momento de la inicializacion.
 */
//Uso de cookies
app.use(cookieParser());

//Conexión con el servidor de mongoDB
mongoose.connect(`mongodb+srv://rodrigoo2012r:${credentials.pass}@ecommerce.nkxjpdn.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=ecommerce`)
    .then(() => console.log("OK"))
    .catch(err => console.log(err))

//Socket.io atento a cuando hayan nuevas conexiones
socketServer.on('connection', async socket => {
    console.log("Nuevo cliente conectado");

    socket.on('getProducts', async () => {
        socket.emit('listaProductos', await productModel.find().lean())
    })
})

export { socketServer };