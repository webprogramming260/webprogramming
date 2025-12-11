const { WebSocketServer } = require('ws');
const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;
server = app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

// Create a websocket object
const socketServer = new WebSocketServer({ server });

socketServer.on('connection', (socket) => {
  socket.isAlive = true;

  // Forward messages to everyone except the sender
  socket.on('message', function message(data) {
    socketServer.clients.forEach(function each(client) {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  // Respond to pong messages by marking the connection alive
  socket.on('pong', () => {
    socket.isAlive = true;
  });
});

// Periodically send out a ping message to make sure clients are alive
setInterval(() => {
  socketServer.clients.forEach(function each(client) {
    if (client.isAlive === false) return client.terminate();

    client.isAlive = false;
    client.ping();
  });
}, 10000);
