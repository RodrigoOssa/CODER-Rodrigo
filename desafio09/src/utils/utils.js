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
export const isValidPassword = (user, pass) => {
    return bcrypt.compareSync(pass, user.pass);
};
