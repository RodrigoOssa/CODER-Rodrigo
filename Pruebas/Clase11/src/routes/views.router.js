import express from 'express';

const viewsRouter = express.Router();

viewsRouter.get("/", (req, res) => {

    res.status(200).render("layouts/index", { info: "Pagina principal" })
})

export default viewsRouter;