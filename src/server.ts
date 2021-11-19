require('dotenv').config();
import express = require('express');
import socketio from 'socket.io';
import http from 'http';

const app = express();

const httpServer = http.createServer(app);

const io = new socketio.Server(httpServer, {
  cors: {
    origin: ["http://localhost", "http:192.168.56.1"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

app.get('/api/v1/sendMessage', (req, res) => {
  res.send(`teste`)
  io.emit('received', `Recebi via Get -> enviando via websocket!`)   
  console.log("Resposta http server")
});

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);
  
  console.log(io.of('/').adapter.rooms); 
  socket.on('message', msg => {
      io.emit('received', `Received!`)         
  })
});

httpServer.listen(process.env.PORT, () => {
  console.log(`Socket server is running at https://localhost: ${process.env.PORT}`)
});
