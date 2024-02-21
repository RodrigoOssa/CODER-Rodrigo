const socket = io();
const mostrarProductos = document.getElementById('productos')

console.log(productos);
socket.on('listaProductos', (data) => {
    mostrarProductos.innerHTML = "";
    data.forEach(element => {
        mostrarProductos.innerHTML += `<h2>${element.title}</h2>`;
        mostrarProductos.innerHTML += `<p>${element.description}</p>`;
        mostrarProductos.innerHTML += `<p>Precio <strong>${element.title}</strong></p>`;
        mostrarProductos.innerHTML += `<p>Stock <strong>${element.stock}</strong></p>`;
        mostrarProductos.innerHTML += `<p>Categoria <strong>${element.category}</strong></p>`;
    });
    console.log(data)
})
