console.log("JS cargado")

const socket = io();
socket.emit('message', "Hola, soy un mensaje de los adventistas!")

socket.on('return_msg', data => console.log(data))

socket.on('canal_broadcast', data => console.log(data))

socket.on('canal_todos', data => console.log(data))