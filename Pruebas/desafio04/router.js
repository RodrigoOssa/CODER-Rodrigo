//Ejemplo de estructura para router
import { Router } from 'express';

const router = Router();

let userArr, petArr = [];

router.get('/api/users', (req, res) => {
    res.status(200).send(userArr)
})

router.post('/api/users', (req, res) => {
    userArr.push(req.body)
    console.log(req.body)
    res.status(200).send({ status: "Ok", msg: "Usuario agregado con éxito" })
})

router.get('/api/pets', (req, res) => {
    console.log(req.body)
    res.status(200).send(petArr)
})

router.post('/api/pets', (req, res) => {
    let pet = req.body;
    petArr.push(pet)
    console.log(req.body)
    res.status(200).send({ status: "Ok", msg: "Pet agregado con éxito" })
})

export default router;