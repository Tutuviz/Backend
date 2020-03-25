const http = require("http");

const app = (request, response) => {
    console.log(request.method, request.url);

    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write(`Hello ${request.url.replace("/", "")}\n`);
    response.write('Hello ' + request.url.replace("/", ""));
    response.end();
    
};

const server = http.createServer(app);

server.listen(8081, () =>  console.log('Rodando!'));
//Mudanca 2
