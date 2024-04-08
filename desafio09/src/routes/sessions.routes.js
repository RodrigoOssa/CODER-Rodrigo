import express from "express";
import { userModel } from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils/utils.js";

const sessions = express.Router();

const auth = async (req, res, next) => {
    try {
        const dataUser = await userModel.findOne({ user_name: req.session.user_name });
        if (dataUser && dataUser.user_name === req.session.user_name && dataUser.password === req.session.password) {
            return next();
        } else {
            return res.status(401).send("Error de autorización");
        }
    } catch (err) {
        return res.status(400).send({ status: "Error", msg: "Error al consultar la base de datos" })
    }
}

/**
 *  En este endpoint se inicializa la sesión. Si no existe el counter se inicializa en 1, y si existe lo incrementa. 
 **/
sessions.get('/session', (req, res) => {
    console.log(req.session)
    if (req?.session?.counter) {
        req.session.counter++;
        res.send('Se ha visitado el sitio ' + req.session.counter + " veces.");
    } else {
        req.session.counter = 1;
        res.send("Bienvenidos");
    }
})
/**
 *  Endpoint para eliminar datos de una variable de session, se utiliza el parametro req y el metodo destroy.
 *  Como parametro se manda un callback
 */

sessions.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (!err) res.status(200).redirect('/login');
        else res.send({ status: "logout ERROR", body: err })
    })
})

/**
 *  Login con session. Para iniciar sesión se verifica que los datos ingresados por el usuario sean los correctos.
 *  Si lo es se guarda en session los datos de este usuario. Se puede crear la variable "admin" en session para
 *  indicar que se trata de un usuario administrador.
 */

sessions.post('/login', async (req, res) => {
    const { user_name, password } = req.body;
    if (!user_name || !password) {
        return res.status(400).send({ status: "ERROR", error: "Uno o mas campos incompletos" })
    }
    //Logueo del super secreto admin
    if (user_name === "adminCoder" && password === "adminCod3r123") {
        console.log("Credenciales correctas")
        req.session.first_name = "Coder";
        req.session.last_name = "House";
        req.session.user_name = "adminCoder";
        req.session.email = "adminCoder@coder.com";
        req.session.age = "30";
        req.session.password = "adminCod3r123";
        req.session.rol = "admin";
        return res.status(200).redirect('/');
    }

    try {
        const dataUser = await userModel.findOne({ user_name: user_name });
        if (dataUser && dataUser.user_name === user_name) {
            if (isValidPassword(dataUser, password)) return res.send("Password incorrecta")
            req.session.first_name = dataUser.first_name;
            req.session.last_name = dataUser.last_name;
            req.session.user_name = dataUser.user_name;
            req.session.email = dataUser.email;
            req.session.age = dataUser.age;
            req.session.password = dataUser.password;
            req.session.rol = dataUser.rol;
            return res.status(200).redirect('/');
        } else {
            return res.status(400).redirect('/accountDoestExist')
        }
    } catch (err) {
        return res.status(400).send({ status: "Error", msg: "Error al consultar la base de datos" })
    }
})

sessions.post('/register', async (req, res) => {
    const { first_name, last_name, user_name, email, age, password } = req.body;
    if (!first_name || !last_name || !user_name || !email || !age || !password) {
        return res.status(400).send({ status: "ERROR", error: "Uno de los campos es undefined" })
    }
    try {
        const userInDB = await userModel.findOne({ user_name: user_name });
        if (!userInDB) {
            const newUser = await userModel.create({
                first_name,
                last_name,
                user_name,
                email,
                age,
                password: createHash(password),
                rol: "user"
            })
            if (newUser) {
                console.log({ msg: "usuario agregado", newUser })
                req.session.first_name = first_name;
                req.session.last_name = last_name;
                req.session.user_name = user_name;
                req.session.email = email;
                req.session.age = age;
                req.session.password = createHash(password);
                req.session.rol = newUser.rol;
                return res.status(200).redirect('/')
            } else {
                console.log({ msg: "Error al cargar usuario", newUser })
                return res.status(400).send({ status: "ERROR", msg: "Error al crear el usuario", newUser })
            }
        } else {
            req.session.first_name = first_name;
            req.session.last_name = last_name;
            req.session.user_name = user_name;
            req.session.email = email;
            req.session.age = age;
            req.session.password = createHash(password);
            req.session.rol = userInDB.rol;
            console.log(req.session);
            return res.status(200).redirect('/alreadyregister')
        }
    } catch (err) {
        res.status(400).send({ status: "ERROR", error: err })
    }
})

/**
 *  Middleware de autenticación
 * Mediante estos middleware se puede limitar el acceso a determinadas rutas a aquellos usuarios que sean administradores.
*/
/* const auth = (req, res, next) => {
    if (req.session.user === "yo" && req.session?.admin) {
        return next();
    }
    return res.status(401).send("Error de autorización")
} */
//Al aplicar el middleware de autenticación solo estará accesible luego de que el usuario haya iniciado sesión.
//Además se puede especificar, según el código del middleware, cierto usuario o tipo de usuario.
sessions.get('/admin', auth, (req, res) => {
    res.send("Esta es la página que permite ver si sos administrador")
})

export default sessions;