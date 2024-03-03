import express from 'express';
import __dirname from './path.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js';

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
