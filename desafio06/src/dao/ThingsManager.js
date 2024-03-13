import crypto from 'crypto';
import fs from 'fs';

class ThingsManager {

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
    async getThings() {
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
    async addThings(producto) {
        //Corrobora que producto esté en el JSON
        let productosJSON = await this.getThings();
        if (!productosJSON) {
            console.log("No se pudo agregar")
            return false
        } else {
            let valorProducto = true;
            let retorno = true;

            //Se valida que el objeto no tenga valores vacios o nulos
            Object.values(producto).forEach(item => {
                if (item === '' || item === null) {
                    console.log("No se aceptan campos vacíos o nulos")
                    valorProducto = false;
                    retorno = false
                }
            })
            if (valorProducto && retorno) {
                //Se crea un id y se agrega al JSON
                producto.id = crypto.randomBytes(8).toString('hex');
                const newProductosJson = await this.getThings();
                newProductosJson.push(producto);
                return await fs.promises.writeFile(this.path, JSON.stringify(newProductosJson))
                    .then(() => console.log("Producto agregado."))
                    .then(() => true)
                    .catch(err => console.log(err))
                    .catch(() => false)
            } else {
                return false
            }
        }
    }

    /**
    * Busca un producto mediante el Id
    * @param {string} Id producto a buscar
    * 
    */
    async getThingsById(Id) {
        const resultado = await this.getThings()
            .then(productos => productos.find(item => item.id === Id))
            .catch(err => err)
        if (!resultado) {
            console.log("No se encontró")
            return null
        } else {
            return resultado
        }
    }

    /**
    * Busca una cosa mediante el Id.
    *
    * Retorna true si pudo actualizar los datos.
    * 
    * Retorna false si no pudo actualizar los datos.
    * 
    * @param {string} id Id producto a buscar.
    * @param {obj} dato Obj nuevo con los datos a actualizar.
    * @return {boolean} 
    */
    async updateThings(id, dato) {
        const productoIndex = await this.getThings()
            .then(productIndex => productIndex.findIndex(item => item.id === id))
        let newProductosJson = await this.getThings()
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
    async deleteThings(id) {
        let retorno = true;
        const productoIndex = await this.getThings()
            .then(productIndex => productIndex.findIndex(item => item.id === id))
        if (productoIndex !== -1) {
            let newProductosJson = await this.getThings()
                .then(products => products)
            newProductosJson.splice(productoIndex, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(newProductosJson))
                .then(() => console.log("Producto eliminado"))
                .then(() => retorno = true)
                .catch(err => console.log(err))
                .catch(() => retorno = false)
            return retorno
        } else {
            console.log("El producto no existe")
            return false
        }
    }
}


export default ThingsManager;