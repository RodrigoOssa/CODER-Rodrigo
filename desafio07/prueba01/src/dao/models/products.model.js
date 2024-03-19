import mongoose from "mongoose";

const productCollections = "products" //Así es como se llama la colección en la base de datos-

const productSchema = new mongoose.Schema({
    //Acá van todas las propiedades que queremos que tenga el usuario en nuestr DB.
    id: String,
    title: String,
    description: String,
    price: Number,
    thumbnail: Array,
    code: {
        type: String,
        unique: true
    },
    stock: Number
})

export const productModel = mongoose.model(productCollections, productSchema);

/* 
Luego en el router se importa el productModel y se utiliza

import {productModel} from './ruta.js';

const router = Router();
router.get("/", async (req, res) =>{
    try{
        let products = await productModel.find();
        res.send({result: "Success, payload:products"})
    }catch(error){
        console.log("No se pudo obtener los usuarios con mongoose: "+ error)
    }
})
*/