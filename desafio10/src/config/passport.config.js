/**
 *  Passport es un generador de estrategias de autenticación y autorizacion, para mantener un código limpio, estructurado y altamente configurable.
 *  Se pueden utilizar y configurar múltiples estrategias de autenticado y autorización.
 *  En este caso se creará una estrategia local.
*/

import passport from "passport";
import local from "passport-local";
import { userModel } from "../dao/models/user.model.js";
import { createHash, generateToken, isValidPassword } from "../utils/utils.js";
import GithubStrategy from "passport-github2";
//Para usar la estrategia de login con JSON web token
import jwt from 'passport-jwt';
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
const JWTStrategy = jwt.Strategy;   //Core de la estrategia de jwt
const ExtractJWT = jwt.ExtractJwt;  //Extractor de jwt. Ya sea de header, cookies, etc.

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['tokenCookie']
    }
    return token;
}

const initPassport = () => {
    //Se inicializa la estrategia local

    //Estrategia local
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
                console.log(userData)
                if (userData) {
                    //No encontrar un usuario no significa que sea un error, así que el error lo pasamos como null, pero al usuario como false.
                    //Esto significa que ocurrió un error al buscar el usuario, pero el usuario ya existe y no puede continuar
                    console.log("El usuario ya existe");
                    return done(null, false);
                }
                console.log("El usuario fue creado con éxito")
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

    //Estrategia con github
    passport.use('github', new GithubStrategy({
        clientID: "Iv1.595fbeb58d9b651a",
        clientSecret: "2126b20c3312792daf52fbe07947c27dec275217",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userModel.findOne({ user_name: profile._json.name })
            if (!user) {
                const newUser = await userModel.create({
                    first_name: profile._json.name,
                    last_name: profile._json.last_name || null,
                    user_name: profile._json.login,
                    email: profile._json.email,
                    age: 20,
                    password: createHash("123"),
                    rol: "user"
                })
                done(null, newUser)
            } else {
                console.log("El usuario de github ya existia")
                console.log(user)
                done(null, user)
            }
        } catch (err) {
            console.log(err)
            done(err)
        }
    }))

    /**
     * Para poder usar JWT se necesita un estilo de extracción de token que se vaya a usar, el cual puede ser por coockie, header o del body.
     * Passport no controla las cookies por si solo. Hace uso de una funció personalizada para extraer la cookie, esta función se llamará "cookieExtractor".
     * Se volverá a utilizar cookieParser. Configurado correctamente la estrategia, passport contendrá el usuario ya parseado a partir de un campo "jwt_payload". 
    */
    //Estrategia con jwt
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'S3cr3tK3y', //Debe ser el mismo que en app.js
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (err) {
            return done(err);
        }
    }))
}

//Estrategia de login
passport.use('login', new LocalStrategy(
    { usernameField: 'user_name' },
    async (user_name, password, done) => {
        console.log({ user_name, password })
        try {
            const user = await userModel.findOne({ user_name: user_name });
            if (!user) {
                console.log("El usuario no existe");
                return done(null, false);
            }
            if (!isValidPassword(user, password)) {
                console.log("El usuario existe pero contraseña incorrecta");
                return done(null, false);
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
))

//Función de serealizar y deserializar fuera de la estrategia local.
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user)
});

export default initPassport;

