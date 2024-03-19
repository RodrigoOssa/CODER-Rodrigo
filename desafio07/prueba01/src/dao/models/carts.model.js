import mongoose from "mongoose";

const cartCollections = "carts" //Así es como se llama la colección en la base de datos-

const cartSchema = new mongoose.Schema({
    //Acá van todas las propiedades que queremos que tenga el usuario en nuestr DB.
    first_name: String,
    last_name: String,
    age: Number,
    email: {
        //Si necesitamos por ejemplo especificar que sea unico tenemos que hacerlo como un objeto.
        type: String,
        unique: true
    }
})

export const cartModel = mongoose.model(cartCollections, cartSchema);

/* 
Luego en el router se importa el cartModel y se utiliza

import {cartModel} from './ruta.js';

const router = Router();
router.get("/", async (req, res) =>{
    try{
        let carts = await cartModel.find();
        res.send({result: "Success, payload:carts"})
    }catch(error){
        console.log("No se pudo obtener los usuarios con mongoose: "+ error)
    }
})
*/