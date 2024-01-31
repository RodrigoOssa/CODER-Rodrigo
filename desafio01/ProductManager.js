import crypto from 'crypto';
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

class ProductManager {

    #modeloObj = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];

    constructor() {
        this.products = []
    }

    addProduct(producto) {
        let existencia = this.products.some(item => item.code === producto.code);
        if (existencia) {
            console.log("El producto ya existe, no se puede agregar")
            return "El producto ya existe"
        } else {
            let propiedadProducto = true, valorProducto = true;

            this.#modeloObj.forEach((item) => {
                if (!Object.keys(producto).includes(item)) {
                    console.log("No se ha ingresado una o mas claves")
                    propiedadProducto = false;
                    return null;
                }
            })
            Object.values(producto).forEach(item => {
                if (item === '' || item === null) {
                    console.log("No se aceptan campos vacíos o nulos")
                    valorProducto = false;
                    return
                }
            })
            if (propiedadProducto && valorProducto) {
                producto.id = crypto.randomBytes(8).toString('hex');
                this.products.push(producto)
            }
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(Id) {
        const resultado = this.products.find(item => item.id === Id);
        if (resultado) {
            return resultado
        } else {
            console.log("Not Found")
        }
    }
}


let manejadorProductos = new ProductManager();
console.log(manejadorProductos.getProducts());
manejadorProductos.addProduct(producto3)
console.table(manejadorProductos.getProducts())
manejadorProductos.addProduct(producto3)

let myIdProducto = manejadorProductos.getProducts()[0].id;
console.log(manejadorProductos.getProductById(myIdProducto))
manejadorProductos.getProductById("asd8asd2")