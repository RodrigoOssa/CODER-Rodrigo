//Modelo de datos de productos
import { productModel } from "./dao/models/products.model.js";
//rutas
import viewsRoute from "./routes/views.routes.js";
import productRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/carts.routes.js";
import endpointTest from "./routes/endpointTest.routes.js";
import cookieTest from "./routes/cookieTest.routes.js";
import __dirname from './path.js';
//Importación necesaria para usar servidor de express
import express from "express";
//Importación necesaria para usar handlebars
import { engine } from "express-handlebars";
//Importación necesaria para usar sockets
import { Server } from "socket.io";
//Importación necesaria para poder usar mongoose y conectarse a mongo
import mongoose from "mongoose";
//Importación para usar coockies
import cookieParser from "cookie-parser";
//Importación necesaria para usar session
import session from 'express-session';
import sessions from "./routes/sessions.routes.js";
//Importación necesaria para guardar la sessión en local ó en mongo
import FileStore from "session-file-store";
import MongoStore from "connect-mongo";
//importaciones necesarias para passport
import passport from "passport";
import initPassport from "./config/passport.config.js";

const credentials = {
    pass: "dzODkx9YPceycYt7"
}

const fileStorage = FileStore(session);   //Conectamos session con lo que será el FileStore
const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log("Server escuchando puerto " + PORT))
const socketServer = new Server(httpServer);

/* 
*   Usamos el middleware para manejo de sesiones
*/

app.use(session({
    /**
     *  FileStore sirve para guardar las sessiones en el servidor e impedir que se borren ante un eventual reinicio, pudiendo recuperrar el sessionID.
     */
    //store: new fileStorage({ path: './sessions', ttl: 100, retries: 0 }),
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://rodrigoo2012r:${credentials.pass}@ecommerce.nkxjpdn.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=ecommerce`,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }/* ,
        ttl: 15 */
    }),
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
//Midleware de passport, justo despues de la declaración de nuestro middleware de sessions.
initPassport();
app.use(passport.initialize());
app.use(passport.session());

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
app.use('/api/sessions', sessions);
app.use('/cookieTest', cookieTest);
app.use('/endpoint', endpointTest);

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