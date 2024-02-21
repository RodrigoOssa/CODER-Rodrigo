import express from 'express';

const app = express();

const users = [
    {
        id: "01",
        nombre: "Lucas",
        edad: 27,
        provincia: "Mendoza"
    },
    {
        id: "02",
        nombre: "Martina",
        edad: 28,
        provincia: "Mendoza"
    },
    {
        id: "03",
        nombre: "Juan",
        edad: 21,
        provincia: "Mendoza"
    },
    {
        id: "04",
        nombre: "Martin",
        edad: 15,
        provincia: "San Juan"
    }

]

app.get('/saludo', (req, res) => {
    res.send("Hola mundo")
})

app.get('/', (req, res) => {
    let mostrarRes = '';
    users.forEach(element => {
        let objeto = '';
        for (let i in element) {
            objeto += `"${i}": "${element[i]}" `
        }
        mostrarRes += `<p>{${objeto}}<\p> \n`
    })
    console.log(mostrarRes)
    res.send(mostrarRes)
})

app.get('/usuario/:id', (req, res) => {
    let id = req.params.id
    console.log(id)
    let resultado = users.find(users => users.id === id)
    res.send(resultado)
})

app.use(express.urlencoded({ extended: true }))
app.get('/query', (req, res) => {
    let { nombre, apellido, pais } = req.query
    res.send(`
        <p>Nombre: ${nombre}</p>
        <p>Apellido: ${apellido}</p>
        <p>Pais: ${pais}</p>
        `)
})

app.listen(8080, () => console.log("Servidor on puerto 8080"))