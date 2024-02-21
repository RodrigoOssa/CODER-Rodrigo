import __dirname from "./path.js";
import express from 'express';
import { engine } from "express-handlebars";
import routes from "./routes/routes.js";
import { Server } from "socket.io";

const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log("Servidor a la escucha en puerto " + PORT));
const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', engine({
    defaultLayout: false
}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use('/', routes)


socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado");

    socket.on('message', data => {
        console.log(data)
        socket.emit('return_msg', "No estamos en casa");
    })


    socket.broadcast.emit('canal_broadcast', "Nuevo usuario conectado")

    socketServer.emit('canal_todos', "Esto lo recibis vos y todos")
})