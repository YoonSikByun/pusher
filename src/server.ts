//Importing Libraries 
require("dotenv").config();
// const app = require(".")
const express = require('express');
var cors = require('cors')
const app = express();
/*
  ===============================================================
 Importing the port set on the .env, if the port number is not set on .env or the port is being used by another server
running on the local macchine we are asking the app to use 3000 as the port number 
  ===============================================================
*/

const PORT = process.env.PORT || 3000

const server = require('node:http').createServer(app);
const io = require('socket.io')(server, {cors: {origin: '*',}});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  console.log('comin.....');
  res.send('Hello World!');
});

// app.get('/test', (req, res) => {
//   res.send('Test Hello World!');
// });

// app.post('/json', (req, res) => {
//   console.log(req.body);
//   console.log(req.body['number1']);

//   res.status(200);
//   res.send({ message: "Sockets tested" });
// });

// app.post('/auth', (req, res) => {
//   res.status(200);
//   res.send(auth(req.body));
// })

// app.listen(PORT, async () => {
//   console.log(`listning on port ${PORT}`);
// });

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
