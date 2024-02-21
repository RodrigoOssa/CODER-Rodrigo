import { Router } from "express";
import userData from '../data/users.js'
const router = Router();

router.get('/', (req, res) => {

    res.render('templates/usuario', userData);
})

export default router;