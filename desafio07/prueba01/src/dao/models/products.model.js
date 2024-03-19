import mongoose from "mongoose";

const productCollections = "products" //Así es como se llama la colección en la base de datos-

const productSchema = new mongoose.Schema({
    //Acá van todas las propiedades que queremos que tenga el usuario en nuestr DB.
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    price: Number,
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnail: Array
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