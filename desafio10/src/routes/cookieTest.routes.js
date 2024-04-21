import { Router } from "express";

const cookieTest = Router();

//Usando el objeto res para enviar la cookie al cliente
cookieTest.get('/setCookie', (req, res) => {
    //Si no se coloca el parámetro maxAge la cookie persistirá hasta ser borrada.
    //res.cookie("MiCookie", "Este es un ejemplo con un objeto en la cookie"/* , { maxAge: 10000 } */)/* .send("Cookie"); */

    /* 
    *   Para poder firmar la cookie solo es necesario colocar un {signed:true} en la definición de la cookie:
    *   
    *   res.cookie("MiCookie", "Este es un ejemplo con un objeto en la cookie", { maxAge: 10000, signed: true })
    * 
    */


})

cookieTest.get('/getCookie', async (req, res) => {
    //Para leer una cookie seteada en el cliente se utiliza el objeto req
    res.send(req.cookies)
    //Para leer una cookie en especial se usa el objeto req pero con el nombre de la cookie.
    //res.send(req.cookies.MiCookie)

    //Para poder acceder a una cooki firmada se debe utilizar:
    //  req.signedCookie

    //Si se intenta acceder a una cookie que fue alterada, al intentar acceder a la misma tirará un false
})

cookieTest.get('/deleteCookie', async (req, res) => {
    //En caso que la cookie ya haya sido eliminada o caducada el clearcookie procede a ignorarlo.
    res.clearCookie('MiCookie').send('Cookie eliminada')
})

export default cookieTest;