const http = require("http");
const { defaultHeaders: headers } = require ("./src/configs");
const app = require ("./src/app");


const server = http.createServer(app);
server.listen(8081, () => console.log("Running"));
