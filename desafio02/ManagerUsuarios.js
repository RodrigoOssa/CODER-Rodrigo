import fs from 'fs';

class ManagerUsuarios {

    #usuarios = fs.existsSync('./Usuarios.json') ?
        JSON.parse('./Usuarios.json') :
        fs.writeFileSync('./Usuarios.json');
    #modeloObj = ['nombre', 'apellido', 'edad', 'curso'];
    constructor() {
    }

    getUsuario() {

    }

    setUsuario(usuarioObj) {
        //Sistema de validación del objeto entrante
        let propiedadusuario = true, valorusuario = true;

        this.#modeloObj.forEach((item) => {
            if (!Object.keys(usuarioObj).includes(item)) {
                console.log("No se ha ingresado una o mas claves")
                propiedadusuario = false;
                return null;
            }
        })
        Object.values(usuarioObj).forEach(item => {
            if (item === '' || item === null) {
                console.log("No se aceptan campos vacíos o nulos")
                valorusuario = false;
                return
            }
        })
        if (propiedadusuario && valorusuario) {
            this.#usuarios.push(usuarioObj)
            console.log("Usuario agregado")
        }
    }
}

export default ManagerUsuarios;