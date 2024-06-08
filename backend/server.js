const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use(express.urlencoded({ extended: true }));

const io = require('socket.io')(server);

console.log('Listening on port 4000...');

const users = {};

io.on('connection', (socket) => {
  socket.on('new-user', (username) => {
    users[socket.id] = username;
    socket.broadcast.emit('user-connected', username);
  });
  socket.on('send-chat-message', (message) => {
    socket.broadcast.emit('chat-message', {
      message: message,
      username: users[socket.id],
    });
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
  });
});
