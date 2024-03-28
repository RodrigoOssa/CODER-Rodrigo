import { Router } from "express";
import { productModel } from "../dao/models/products.model.js";
import { getId } from "../utils/idGenerator.js";
const productRoutes = Router();

function resModel(status, payload, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, prevLink, nextLink) {
    this.status = status;
    this.payload = payload;
    this.totalPages = totalPages;
    this.prevPage = prevPage;
    this.nextPage = nextPage;
    this.page = page;
    this.hasPrevPage = hasPrevPage;
    this.hasNextPage = hasNextPage;
    this.prevLink = prevLink;
    this.nextLink = nextLink
}

productRoutes.get('/', async (req, res) => {
    let { limit, page, query, sort } = req.query;
    limit = limit || 100;
    page = page || 1;
    query = query || {};
    sort = sort || false;
    try {
        const totalProducts = (await productModel.find()).length;
        let products;
        if (sort === 1 || sort === -1) {
            products = await productModel.find(query).limit(limit).sort({ price: -1 });
        } else {
            products = await productModel.find(query).limit(limit);
        }

        res.send(new resModel(
            "sucess",
            products,
            (Math.floor(totalProducts / limit) + 1),
            ((page - 1) ? page - 1 : null),
            (page + 1),
            (page),
            ((page === 1) ? false : true),
            ((totalProducts > limit * page) ? true : false),
            null,
            null
        ))
    } catch (error) {
        console.log("No se pudo obtener los products con mongoose: " + error);
        res.send({ msg: "No se pudo obtener los products con mongoose:", err: error });
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
        thumbnails: thumbnails || []
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
    console.log(pid)
    try {
        let result = await productModel.findByIdAndDelete(pid)
        console.log(result)
        res.send({ result: result, msg: "Eliminacion de producto exitosa" })
    } catch (error) {
        console.log("No se pudo eliminar el datos: " + error)
        res.send({ err: error, msg: "No se pudo eliminar el producto" })
    }
})

productRoutes.get('/realtimeproducts', async (req, res) => {
    let products = await productos.getThings().lean();
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
})

export default productRoutes;