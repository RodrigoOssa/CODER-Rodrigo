import express from 'express';

const app = express();
const server = app.listen(8080, () => console.log("Puerto a la escucha en el puerto 8080"))

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
        console.log("Usuario agregado")
        return res.send({ status: "success", message: "User crated" })
    }
    res.status(400).send({ status: "error", error: "Faltan o sobran datos" })
})

app.get('/api/users', (req, res) => {

    res.send(usrs)
})