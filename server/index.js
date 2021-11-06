const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const http = require("http");

const server = http.createServer(app);

console.log("express using port: ", process.env.NODE_PORT);
server.listen(process.env.NODE_PORT);

module.exports = { http, server };
