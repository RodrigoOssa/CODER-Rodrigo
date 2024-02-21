import express from 'express';
import DBRodrah from './db.js';

const app = express();
const server = app.listen(8080, () => console.log("Puerto a la escucha en el puerto 8080"))

const dbRodrah = new DBRodrah();
/* 
Para que nuestro servidor de express pueda interpretar en forma autmática mensajes de tipo JSON en formato urlcoded al recibirlos, debemos indicarlo en forma explícita, agregando la siguiente línea
*/
app.use(express.json())
app.use(express.urlencoded({ extended: true })) //El 'extended' precisa que el objeto req.body contendrá valores de cualquier tipo en lugar de solo cadenas. Sin esto el servidor no sabrá como interpretar los objetos.

let usrs = [];

app.post('/api/user', (req, res) => {
    let user = req.body;
    if (Object.keys(user).length === 2) {
        usrs.push(user)
        dbRodrah.setDB(user)
        console.log("Usuario agregado")
        return res.send({ status: "success", message: "User crated" })
    }
    res.status(400).send({ status: "error", error: "Faltan o sobran datos" })
})

app.put('/api/users', (req, res) => {
    try {
        let userData = req.body;
        if (dbRodrah.updateDB(userData)) {
            res.status(200).send({ status: "ok", msg: "Usuario Modificado" })
        } else {
            res.status(400).send({ status: "Error", error: "No habian datos para modificar" })
        }
    } catch (err) {
        console.log(err)
    }
})

app.delete('/api/users/:uID', (req, res) => {
    const UID = req.params.uID;
    try {
        if (dbRodrah.deleteDB(UID)) {
            res.status(200).send({ status: "OK", msj: "Usuario eliminado con éxito" })
        } else {
            res.status(400).send({ status: "BAD", msj: "No se encontró el usuario asociado al ID" })
        }
    } catch (err) {
        console.log("Hubo un error", err)
    }
})

app.get('/api/users', (req, res) => {

    res.send(dbRodrah.getDB())
})

