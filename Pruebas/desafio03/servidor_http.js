import http from 'http';
const server = http.createServer((request, response) =>
    response.end("Hola mundo \n Primera página\n no tildes"))

server.listen(8080, () =>
    console.log("Servidor andando")
)