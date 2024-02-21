import fs from 'fs';
//import { promises as fs } from 'fs';

const PATH = "./";
const DEF_NAME = "ejemplo.txt";
const ASYNC_NAME = "ejemplo_asyn.txt"

//fs.writeFileSync("./ejemplo_01.txt", "Hola mundo");

if (fs.existsSync(`${PATH}${DEF_NAME}`)) {
    let contenido = fs.readFileSync(`${PATH}${DEF_NAME}`, 'utf-8');
    console.log(contenido)
    fs.appendFileSync(`${PATH}${DEF_NAME}`, "\n Soy una nueva linea")
    fs.unlinkSync(`${PATH}${DEF_NAME}`)
    console.log("Archivo eliminado")
} else {
    fs.writeFileSync(`${PATH}${DEF_NAME}`, "Hola mundo. Existo!!");
    console.log("Archivo creado")
}

//Asincrono

let leerArchivo = async () => {
    let contenido = await fs.readFile(`${PATH}${DEF_NAME}`, 'utf-8', (err, data) => {
        if (err) {
            console.log("retorna err")
            contenido = err
        } else {
            console.log("retorna data")
            contenido = data
        }
    })
    console.log(contenido)
    return contenido
}

let algo = leerArchivo();
setTimeout(() => {
    console.log("Llamada funcion", algo)

}, 1000)