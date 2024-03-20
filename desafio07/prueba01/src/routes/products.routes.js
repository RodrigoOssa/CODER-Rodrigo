import { Router } from "express";
import { productModel } from "../dao/models/products.model.js";
import { getId } from "../utils/idGenerator.js";
const productRoutes = Router();

productRoutes.get('/', async (req, res) => {
    const { limit } = req.query || 100;
    try {
        let products = await productModel.find().limit(limit);
        res.send({ result: "Success, payload:products", products: products })
    } catch (error) {
        console.log("No se pudo obtener los usuarios con mongoose: " + error)
    }
})
productRoutes.get('/:pid', async (req, res) => {
    const pid = req.params.pid;
    console.log("Pid", pid)
    try {
        let products = await productModel.find({ id: pid });
        res.send({ result: "Success, payload:products", products: products })
    } catch (error) {
        console.log("No se pudo obtener los usuarios con mongoose: " + error)
    }
})

productRoutes.post('/', async (req, res) => {
    console.log("post", req.body);
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    console.log(req.body)   //Usar esto para aceptar el cuerpo de la peticion
    console.log(req.query) //Usar esto si le mandan parametros
    const newProduct = {
        id: getId(),
        title: title,
        description: description,
        code: code,
        price: price,
        status: status,
        stock: stock,
        category: category,
        thumbnails: thumbnails
    }
    try {
        let result = await productModel.create(newProduct)
        res.send({ result: result, msg: "Carga exitosa", prodcts: newProduct });
    } catch (error) {
        console.log("No se pudo cargar el producto: " + error);
        res.send({ error: error, msg: "No se pudo cargar el producto" });
    }
})
productRoutes.put('/:pid', async (req, res) => {
    const newProduct = req.body;
    const pid = req.params.pid;
    newProduct.id = pid;
    try {
        if (newProduct.title || newProduct.description || newProduct.price || newProduct.thumbnail || newProduct.code || newProduct.stock) {
            let result = await productModel.updateOne({ id: pid }, newProduct)
            res.send({ result: result, msg: "Carga exitosa", prodcts: newProduct })
        } else {
            res.send({ err: "Error", msg: "Hubieron campos vacíos." })
        }
    } catch (error) {
        console.log("No se pudo actualizar los datos: " + error)
        res.send({ err: error, msg: "No se pudo actualizar el producto" })
    }
})
productRoutes.delete('/:pid', async (req, res) => {
    const pid = req.params.pid;
    try {
        let result = await productModel.deleteOne({ id: pid })
        res.send({ result: result, msg: "Eliminacion de producto exitosa" })
    } catch (error) {
        console.log("No se pudo eliminar el datos: " + error)
        res.send({ err: error, msg: "No se pudo eliminar el producto" })
    }
})

/* productRoutes.get('/realtimeproducts', async (req, res) => {
    let products = await productos.getThings();
    res.render('templates/realTimeProducts', { productos: products });
})

productRoutes.post('/realtimeproducts', async (req, res) => {
    let newProduct = req.body;
    productos.addThings(newProduct) ?
        socketServer.emit('nuevoProducto', await productos.getThings()) :
        null

    res.status(200).send({ status: "OK" })
})

productRoutes.delete('/realtimeproducts/:pid', async (req, res) => {
    const pid = req.params.pid;
    console.log(pid)
    productos.deleteThings(pid) ?
        socketServer.emit('deleteProducto', await productos.getThings()) :
        null

    res.status(200).send({ status: "OK" })
}) */

export default productRoutes;