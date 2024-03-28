const socket = io();
const mostrarProductos = document.getElementById('productos')
console.log("Inicio componente")

document.addEventListener("DOMContentLoaded", () => {
    console.log("Listo")
    socket.emit('getProducts', [])
});

socket.on('listaProductos', (data) => {
    mostrarProductos.innerHTML = "";
    data.forEach(element => {
        mostrarProductos.innerHTML += `<div class="items">
        <h2>${element.title}</h2>
        <p>${element.description}</p>
        <p>Precio <strong>${element.title}</strong></p>
        <p>Stock <strong>${element.stock}</strong></p>
        <p>Categoria <strong>${element.category}</strong></p>
        </div>
        `;
    });
    console.log(data)
})