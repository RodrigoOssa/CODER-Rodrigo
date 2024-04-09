/**
 *  Passport es un generador de estrategias de autenticación y autorizacion, para mantener un código limpio, estructurado y altamente configurable.
 *  Se pueden utilizar y configurar múltiples estrategias de autenticado y autorización.
 *  En este caso se creará una estrategia local.
*/

import passport from "passport";
import local from "passport-local";
import { userModel } from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils/utils.js";

/**
 *  Passport siempre requerirá un username y password. De no encontrarlos devolverá un error y no podrá seguir con la estrategia.
 *  Se puede cambiar el campo "username" para que tome el campo que se quiera, se puede usar el nombre de usuario o el correo, o lo que se quiera. Se debe modificar {usernameField:"valor"}.
 * 
 *  Passport utiliza un callback "done":
 *      Primer parámetro es el error, si se pasa done(null) indicamos que no hay error.
 *      Segundo parámetro es el usuario generado. Para devolver un usario se hace done(null, user).
 *      Si se pasa done(null, false) se indica que no hay error, pero el usuario no estará disponible.
 * 
 *  Cada estrategia que se desea configurar en passport es un middleware por sí solo, por lo que se utilizará el elemento passport.use() para configurar diferentes middlewares/estrategias.
*/

const LocalStrategy = local.Strategy;
const initPassport = () => {
    //Se inicializa la estrategia local

    passport.use('register', new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: 'user_name'
        },
        async (req, user_name, password, done) => {
            //passReqToCallback permite que se pueda acceder al objeto req como cualquier otro middleware
            const { first_name, last_name, email, age } = req.body;

            try {
                const userData = await userModel.findOne({ user_name: user_name });
                if (userData) {
                    //No encontrar un usuario no significa que sea un error, así que el error lo pasamos como null, pero al usuario como false.
                    //Esto significa que ocurrió un error al buscar el usuario, pero el usuario ya existe y no puede continuar
                    console.log("El usuario ya existe");
                    return done(null, false);
                }
                const newUser = await userModel.create({
                    first_name,
                    last_name,
                    user_name,
                    email,
                    age,
                    password: createHash(password),
                    rol: "user"
                })
                //Si todo salió bien se manda un done(null, usuarioGenerado)
                return done(null, newUser);
            } catch (err) {
                //Cuando hay un error, entonces se manda done con el error
                return done("Error al obtener el usuario: " + err);
            }
        }
    ))
}

export default initPassport;

