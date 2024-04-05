//Importing Libraries 
require("dotenv").config();

import { initPsqlNotify } from "@/libs/pg";

initPsqlNotify();

const express = require('express');
var cors = require('cors')
const app = express();

const PORT = process.env.PORT || 3000

const server = require('node:http').createServer(app);
const io = require('socket.io')(server, {cors: {origin: '*',}});

io.on('connection', (socket) => {
  console.log(`user connected - socket id(${socket.id})`);

  socket.on('chat message', (msg) => {
    const count = io.engine.clientsCount;
    const count2 = io.of("/").sockets.size;
    console.log(`message : ${msg} - socker id :(${socket.id}) - count : ${count}, count2 : ${count2}`);
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
})

server.listen(PORT, () => {
   console.log(`listning on port ${PORT}`);
});

