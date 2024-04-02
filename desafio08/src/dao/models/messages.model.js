import mongoose from "mongoose";

const messagesCollections = "messages" //Así es como se llama la colección en la base de datos-

const messagesSchema = new mongoose.Schema({
    //Acá van todas las propiedades que queremos que tenga el usuario en nuestr DB.
    user: String,
    msg: String
})

export const messagesModel = mongoose.model(messagesCollections, messagesSchema);

/* 
Luego en el router se importa el messagesModel y se utiliza

import {messagesModel} from './ruta.js';

const router = Router();
router.get("/", async (req, res) =>{
    try{
        let messagess = await messagesModel.find();
        res.send({result: "Success, payload:messagess"})
    }catch(error){
        console.log("No se pudo obtener los usuarios con mongoose: "+ error)
    }
})
*/