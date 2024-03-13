import mongoose from "mongoose";

const userCollections = "carts" //Así es como se llama la colección en la base de datos-

const userSchema = new mongoose.Schema({
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

export const userModel = mongoose.model(userCollections, userSchema);

/* 
Luego en el router se importa el userModel y se utiliza

import {userModel} from './ruta.js';

const router = Router();
router.get("/", async (req, res) =>{
    try{
        let users = await userModel.find();
        res.send({result: "Success, payload:users"})
    }catch(error){
        console.log("No se pudo obtener los usuarios con mongoose: "+ error)
    }
})
*/