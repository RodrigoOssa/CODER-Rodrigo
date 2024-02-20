import express from 'express';
import handlebars from 'express-handlebars';
//import routes from './routes/routes.js';
import __dirname from './utils.js';

const server = express();
const PORT = 8080;

//Handlebars
//Le indicamos qué motor vamos a usar.
server.engine('handlebars', handlebars.engine());
//Le decimos en qué parte del proyecto estarán las vistas. (Usar rutas absolutas para evitar asuntos de ruteo relativo)
server.set('views', __dirname, '/views')
//Le indicamos que el motor que inicializamos anteriormente es el que vamos a usar.
server.set('view engine', 'handlebars');

server.use(express.static(__dirname + '/public'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
//server.use(routes);

server.get('/inicio', (req, res) => {

    res.render('index')
})

server.listen(PORT, () => console.log("Servidor a la escucha en puerto " + PORT))