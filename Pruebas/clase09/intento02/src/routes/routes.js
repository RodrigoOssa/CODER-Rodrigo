import { Router } from "express";
import userData from '../data/users.js'
const router = Router();

router.get('/usuarios', (req, res) => {

    res.render('usuario', userData);
})

export default router;