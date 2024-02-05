import crypto from 'crypto';
import fs from 'fs';

class ProductManager {

    //Modelo de como debería de llegar el objeto
    #modeloObj = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];

    constructor(path) {
        this.products = [];
        this.path = path;
        //Corroborar la existencia del json
        !fs.existsSync(this.path) ?
            fs.writeFileSync(this.path, "[]") :
            null
    }

    /**
    * Lee archivo JSON de productos
    *
    * @return Productos parseados
    */
    async getProducts() {
        const productos = await fs.promises.readFile(this.path, 'utf-8')
            .then(data => data)
            .catch(err => err)
        return JSON.parse(productos)
    }

    /**
    * Agrega un producto nuevo si este no existe.
    *
    * Retorna false si existe.
    * 
    * Retorna true si no existe y se agregó correctamente.
    * @param {obj} producto 
    * @return {boolean}
    */
    async addProduct(producto) {
        //Corrobora que producto esté en el JSON
        let productosJSON = await this.getProducts()
            .then(products =>
                products.some(item => item.code === producto.code))
            .catch(() => console.log("Hubo un error al obtener products"))
            .catch(err => err)
        if (productosJSON) {
            console.log("El producto ya existe, no se puede agregar")
            return false
        } else {
            let propiedadProducto = true, valorProducto = true;
            //Se valida que el objeto tenga las llaves correspondientes
            this.#modeloObj.forEach((item) => {
                if (!Object.keys(producto).includes(item)) {
                    console.log("No se ha ingresado una o mas claves")
                    propiedadProducto = false;
                    return false
                }
            })
            //Se valida que el objeto no tenga valores vacios o nulos
            Object.values(producto).forEach(item => {
                if (item === '' || item === null) {
                    console.log("No se aceptan campos vacíos o nulos")
                    valorProducto = false;
                    return false
                }
            })
            if (propiedadProducto && valorProducto) {
                //Se crea un id y se agrega al JSON
                producto.id = crypto.randomBytes(8).toString('hex');
                const newProductosJson = await this.getProducts();
                newProductosJson.push(producto);
                return await fs.promises.writeFile(this.path, JSON.stringify(newProductosJson))
                    .then(() => console.log("Producto agregado."))
                    .then(() => true)
                    .catch(err => console.log(err))
                    .catch(() => false)

            }
        }
    }

    /**
    * Busca un producto mediante el Id
    * @param {string} Id producto a buscar
    * 
    */
    async getProductById(Id) {
        const resultado = await this.getProducts()
            .then(productos => productos.find(item => item.id === Id))
            .catch(err => err)
        if (!resultado) {
            console.log("No se encontró el producto")
            return null
        } else {
            return resultado
        }
    }

    /**
    * Busca un producto mediante el Id.
    *
    * Retorna true si pudo actualizar los datos.
    * 
    * Retorna false si no pudo actualizar los datos.
    * 
    * @param {string} id Id producto a buscar.
    * @param {obj} dato Obj nuevo con los datos a actualizar.
    * @return {boolean} 
    */
    async updateProduct(id, dato) {
        const productoIndex = await this.getProducts()
            .then(productIndex => productIndex.findIndex(item => item.id === id))
        let newProductosJson = await this.getProducts()
            .then(products => products)
        if (productoIndex !== -1) {
            for (let item in dato) {
                if (Object.keys(newProductosJson[productoIndex]).includes(item)) {
                    newProductosJson[productoIndex][item] = dato[item];
                }
            }
            return await fs.promises.writeFile(this.path, JSON.stringify(newProductosJson))
                .then(() => console.log("Producto actualizado."))
                .then(() => true)
                .catch(err => console.log(err))
                .catch(() => false)
        } else {
            console.log("No se encontró el producto");
            return false
        }
    }

    /**
    * Elimina un producto mediante id
    *
    * Retorna true si pudo eliminar el producto.
    * 
    * Retorna false si no pudo eliminar el producto.
    * 
    * @param {string} id Id producto a eliminar.
    *
    * @return {boolean} 
    */
    async deleteProduct(id) {
        const productoIndex = await this.getProducts()
            .then(productIndex => productIndex.findIndex(item => item.id === id))
        if (productoIndex !== -1) {
            let newProductosJson = await this.getProducts()
                .then(products => products)
            newProductosJson.splice(productoIndex, 1)
            return await fs.promises.writeFile(this.path, JSON.stringify(newProductosJson))
                .then(() => console.log("Producto eliminado"))
                .then(() => true)
                .catch(err => console.log(err))
                .catch(() => false)
        } else {
            console.log("El producto no existe")
            return false
        }
    }
}


export default ProductManager;