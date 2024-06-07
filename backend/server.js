const io = require('socket.io')(4000);

console.log('Listening on port 4000...');

io.on('connection', (socket) => {
  socket.on('send-chat-message', (message) => {
    socket.broadcast.emit('chat-message', message);
  });
});
