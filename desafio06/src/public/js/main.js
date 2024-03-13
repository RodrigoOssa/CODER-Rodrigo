const socket = io();

let user;
let chatBox = document.getElementById("chatBox")

Swal.fire({
    title: "Identificarse",
    input: "text",
    text: "Ingresa el usuario para identificarte",
    inputValidator: (value) => {
        return !value && "Ingresa un nombre para continuar"
    },
    allowOutsideClick: false
}).then(result => user = result.value)
    .then(() => socket.emit('newConnection', user))

chatBox.addEventListener("keyup", event => {
    if (event.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            socket.emit("message", { user: user, msg: chatBox.value })
            chatBox.value = "";
        }
    }
})

socket.on('messageLog', data => {
    let log = document.getElementById("messages");
    let messages = "";
    console.log("Mensajes log", data)
    data.forEach(element => {
        messages = messages + `<p class="name">${element.user}:  </p><p>${element.msg}</p>`
    });
    log.innerHTML = messages
})

socket.on('welcome', data => {
    Swal.fire({
        text: `Nuevo usuario conectado ${data}`,
        toast: true,
        position: "top-right"
    })
})

console.log("Scrip cargado")
