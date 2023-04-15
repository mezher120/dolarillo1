const express = require('express');
const server = express();
const routes = require('./routes');

server.use(express.json());
server.name = 'API';
server.use((req, res, next) => { // cors always above routes after creating server
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

server.use('/', routes);





module.exports = server;