import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

app.get('/', (req, res) => {
  res.send('<p>Hello world</p>');
});

let connectionTotal = 0;

io.on('connection', (socket) => {
  connectionTotal++;
  console.log('a user connected');

  io.emit('totalConnections', connectionTotal); // io instead of socket because you want the connectionTotal to go to all available connections

  socket.on('disconnect', () => {
    connectionTotal--;
    io.emit('totalConnections', connectionTotal); // Emit was needed since it was only emitted on connection and not after value was updated
    console.log('a user disconnected');
  });
});

server.listen(4001, () => {
  console.log('Listening on port 4001');
});
