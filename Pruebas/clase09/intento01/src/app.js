import express from 'express';
import { engine } from 'express-handlebars';
import __dirname from './utils.js';
//import routes from './routes/routes.js';

const server = express();
const PORT = 8080;

//Middlewares
server.use(express.json());
server.use('/static', express.static(__dirname + '/public'));
//Handlebars
//Le indicamos qué motor vamos a usar.
server.engine('handlebars', engine());
//Le indicamos que el motor que inicializamos anteriormente es el que vamos a usar.
server.set('view engine', 'handlebars');
//Le decimos en qué parte del proyecto estarán las vistas. (Usar rutas absolutas para evitar asuntos de ruteo relativo)
server.set('views', __dirname, '/views')

//server.use(express.urlencoded({ extended: true }));
//server.use(routes);

server.get('/static', (req, res) => {

    res.render('index')
})

server.listen(PORT, () => console.log("Servidor a la escucha en puerto " + PORT))