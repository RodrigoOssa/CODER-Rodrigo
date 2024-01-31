import ManagerUsuarios from "./ManagerUsuarios.js";
const usr1 = {
    nombre: 'Juancito',
    apellido: 'Luna',
    edad: 20,
    curso: "Coder Inglés"
}
const usr2 = {
    nombre: 'Laura',
    apellido: 'Magdalena',
    edad: 26,
    curso: "Coder Node.js"
}
const usr3 = {
    nombre: 'Martin',
    apellido: 'Nuñes',
    edad: 29,
    curso: "Coder JavaScript"
}
const usr4 = {
    nombre: 'Mariana',
    apellido: 'Mendez',
    edad: 19,
    curso: "Coder UX/UI"
}
const manejoUsuario = new ManagerUsuarios();
manejoUsuario.getUsuarios()
    .then(data => console.log(data))

/* manejoUsuario.setUsuario(usr3)
    .then(data => console.log(data)) */

