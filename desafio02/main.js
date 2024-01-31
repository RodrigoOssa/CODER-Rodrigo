import ProductManager from "./ProductManager.js";

//Objetos de prueba
const producto1 = {
    title: "Jabon",
    description: null,
    price: 123,
    thumbnail: "Sin imagen",
    code: "asd123",
    stock: 20
}
const producto2 = {
    title: "Lavarropas",
    description: "Lava lava",
    price: 4562,
    code: "e2e4s",
    stock: 2
}
const producto3 = {
    title: "Pendrive",
    description: "Pendrive con formita de lego",
    price: 523,
    thumbnail: "Sin imagen",
    code: "qwe123",
    stock: 30
}
const producto4 = {
    title: "Escritorio",
    description: "Escritorio de melamina 90cm",
    price: 2456,
    thumbnail: "Sin imagen",
    code: "4rt4f4",
    stock: 10
}
const producto5 = {
    title: "Botellita deportiva",
    description: "Botella de 1.5 litros",
    price: 123,
    thumbnail: "Sin imagen",
    code: "2fe2",
    stock: 20
}

const manejadorProductos = new ProductManager("./productos.json");

/* 
    Por favor ir descomentando cada paso para corroborar el ejercicio
*/

/* manejadorProductos.getProducts()
    .then(productos => console.log(productos))
 */

/* manejadorProductos.addProduct(producto5)
    .then(() => manejadorProductos.getProducts()
        .then(productos => console.log(productos))) 
*/

let idPrueba = await manejadorProductos.getProducts()
    .then(resultado => resultado[0] ? resultado[0] : null)

/* manejadorProductos.getProducts()
    .then(resultado => manejadorProductos.getProductById(resultado[0].id)
        .then(producto => console.log(producto)))
*/

/*
manejadorProductos.updateProduct(idPrueba, { title: "Bottellon" })
    .then(() => manejadorProductos.getProductById(idPrueba)
        .then(producto => console.log(producto))) 
*/

/* manejadorProductos.deleteProduct(idPrueba)
    .then(resultado => console.log(resultado)) 
*/

