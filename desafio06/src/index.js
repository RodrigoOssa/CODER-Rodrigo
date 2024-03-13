import express from 'express';
import __dirname from './path.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js';
import mongoose from "mongoose";
import { messagesModel } from './dao/models/messages.model.js';

const credentials = {
    pass: "dzODkx9YPceycYt7"
}

const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log("Servidor a la escucha en puerto: " + PORT));
const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine('handlebars', handlebars.engine({ defaultLayout: false }));
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/pubic"));

app.use("/chat", viewsRouter);

mongoose.connect(`mongodb+srv://rodrigoo2012r:${credentials.pass}@ecommerce.nkxjpdn.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce`)
    .then(() => console.log("OK"))
    .catch(err => console.log(err))

const getMessages = async () => {
    return await messagesModel.find()
}
let messages = [];
getMessages()
    .then(data => messages = data)
    .then(data => console.log(data))
io.on('connection', socket => {
    console.log("Nuevo cliente conectado");
    io.emit('messageLog', messages)
    socket.on('message', async data => {
        let { user, msg } = data;
        let result = await messagesModel.create({
            user,
            msg
        })
        console.log(result)
        //messages.push(data); deprecado

        io.emit('messageLog', await getMessages(data => data))
    })
    socket.on('newConnection', data => {
        console.log(data)
        socket.broadcast.emit('welcome', data)
    })
})

export { io };