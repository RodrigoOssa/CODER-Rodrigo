const socket = io();


console.log(productos);
socket.on('nuevoProducto', (data) => {
    console.log("Info que llegaria desde postman")

})

socket.on('actualizar', data => {
    console.log("Cliente actualizado")
    console.log(data)
})