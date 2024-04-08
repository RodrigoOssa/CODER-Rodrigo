import { Router } from "express";

const endpointTest = Router();

endpointTest.get('/session', (req, res) => {
    /* console.log(req)
    res.status(200).send(JSON.parse(req)) */
})

export default endpointTest;