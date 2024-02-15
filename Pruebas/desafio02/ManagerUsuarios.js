import fs from 'fs';
class ManagerUsuarios {

    //Modelo de como debería entrar el objeto, para validar sus claves.
    #modeloObj = ['nombre', 'apellido', 'edad', 'curso'];

    constructor() {
        //Corroborar la existencia del json
        !fs.existsSync('./Usuarios.json') ?
            fs.writeFileSync('./Usuarios.json', '') :
            null
    }

    async getUsuarios() {
        //Lee el JSON y lo parsea
        const allUsuarios = await fs.promises.readFile('./Usuarios.json', 'utf-8')
            .then(data => JSON.parse(data))
        return allUsuarios
    }
    async setUsuario(usuarioObj) {
        //Sistema de validación del objeto entrante
        let propiedadusuario = true, valorusuario = true;
        //Se validan que las claves sean las que correspondan
        this.#modeloObj.forEach((item) => {
            if (!Object.keys(usuarioObj).includes(item)) {
                console.log("No se ha ingresado una o mas claves")
                propiedadusuario = false;
                return;
            }
        })
        //Se  valida que no hayan valores nulos o vacíos
        Object.values(usuarioObj).forEach(item => {
            if (item === '' || item === null) {
                console.log("No se aceptan campos vacíos o nulos")
                valorusuario = false;
                return
            }
        })
        //Al validar el objeto empieza con la carga del nuevo contenido
        if (propiedadusuario && valorusuario) {
            //Llama contenido existente del JSON y lo guarda en una variable (array de usuarios)
            const userList = await this.getUsuarios()
                .then(data => data)
                .catch(err => console.log(err))
            //Se agrega el nuevo usuario al array
            userList.push(usuarioObj);
            //Se agrega el nuevo usuario al JSON
            fs.promises.writeFile('./Usuarios.json', JSON.stringify(userList))
                .then(() => console.log("Usuario agregado correctamente"))
                .catch(err => console.log(err))
            return userList
        }
    }
}

export default ManagerUsuarios;