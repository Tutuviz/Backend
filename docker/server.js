const express = require ("express");

const PORT = 8080;
const HOST = "0.0.0.0";

const server = express();

server.get("/", (req, res)=>{
    res.send("Hello World");
});

server.listen(PORT, HOST);

console.log(`Server rodando na porta: ${PORT}, e no host: ${HOST}`);