import express from "express";
import { engine } from 'express-handlebars';
import __dirname from './utils.js';
import router from "./routes/routes.js";
import userData from "./data/users.js";

const server = express();
const PORT = 8080;

server.use(express.json());
server.use('/static', express.static(__dirname + '/public'));
server.engine('handlebars', engine());
server.set('view engine', 'handlebars');
server.set('views', __dirname + '/views');

server.use(router);

server.get('/usuarios', (req, res) => {
    res.render('templates/usuario', { userData: userData })
    console.log(__dirname)
})
server.listen(PORT, () => console.log("Servidor a la escucha al puerto: " + PORT))