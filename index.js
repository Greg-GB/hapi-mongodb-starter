const Server = require('./src/server');
const config = require('./src/config/index');
const server = new Server(config);

server.start();