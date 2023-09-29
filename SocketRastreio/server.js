const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('user connect');

  socket.on('driverLocation', (data) => {
    // Recebe a latitude e longitude do motorista e transmite para todos os clientes
    io.emit('driverLocation', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnect');
  });
});

server.listen(3000, () => {
  console.log(`🚀 Server started on port ${3000}!`);
});
