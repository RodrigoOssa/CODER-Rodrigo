import bcrypt from "bcrypt";
/**
 *  hashsync toma el password que se le pasa y procede a aplicar un proceso de hasheo a partir de un "salt".
 *  genSaltSync generará un Salt de 10 caracteres. Un Salt es un string random que ahce que el proceso de hasheo se realice de manera impredecible.
 *  Devuelve un string con el password hasheado. El proceso es irreversible.
 */
export const createHash = (pass) => {
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(10))
};

/**
 *  compareSync tomará primero el password sin hashear y lo comparará con el password ya hasheado en la base de datos.
 *  Devolverá true o false dependiendo si el password coincide o no.
 */
export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
};

import jwt from 'jsonwebtoken';

//Una key privada sirve para utilizarse al momento de hacer el cifrado del token

const PRIVATE_KEY = "213i43b5gviudsfi";
/**
 * generateToken: al utilizar jwt.sign:
 * El primer arg es un obj con la información
 * El segundo arg es la llave privada con la cual se realizará el cifrado
 * El tercer arg es el tiempo de expiración del token
*/
export const generateToken = (user) => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "24h" });
    return token;
}
export const authToken = (req, res, next) => {
    //El token viene desde los headers de autorización.
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        //Si no hay header es porque no hay token y por lo tanto no está autenticado.
        return res.status(401).send({ error: "Not Authenticated" })
    }
    const token = authHeader.split(" ")[1]; //Se hace el split para retirar la plabra 'Bearer'.
    jwt.verify(token, PRIVATE_KEY, (err, credentials) => {
        //jwt verifica el token existente y corrobora si es un token válido, alterado, expirado, etc.
        if (err) {
            return res.status(403).send({ error: "Not Authorized" });
        }
        req.user = credentials.user;
        next();
    })
}