import express from "express";

const sessionR = express.Router();

/**
 *  En este endpoint se inicializa la sesión. Si no existe el counter se inicializa en 1, y si existe lo incrementa. 
 **/
sessionR.get('/session', (req, res) => {
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

sessionR.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (!err) res.send("logout ok!")
        else res.send({ status: "logout ERROR", body: err })
    })
})

/**
 *  Login con session. Para iniciar sesión se verifica que los datos ingresados por el usuario sean los correctos.
 *  Si lo es se guarda en session los datos de este usuario. Se puede crear la variable "admin" en session para
 *  indicar que se trata de un usuario administrador.
 */

sessionR.get('/login', (req, res) => {
    const { user, pass } = req.body;
    if (user !== "yo" && pass !== "12345") {
        return res.send("Datos de login inválidos");
    }
    req.session.user = user;
    req.session.admin = true;
    res.send("Login correcto");
})

/**
 *  Middleware de autenticación
 * Mediante estos middleware se puede limitar el acceso a determinadas rutas a aquellos usuarios que sean administradores.
*/
const auth = (req, res, next) => {
    if (req.session?.user === "yo" && req.session?.admin) {
        return next();
    }
    return res.status(401).send("Error de autorización")
}
//Al aplicar el middleware de autenticación solo estará accesible luego de que el usuario haya iniciado sesión.
//Además se puede especificar, según el código del middleware, cierto usuario o tipo de usuario.
sessionR.get('/admin', auth, (req, res) => {
    res.send("Esta es la página que permite ver si sos administrador")
})

export default sessionR;