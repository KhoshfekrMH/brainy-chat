const io = require('socket.io')(4000);

console.log('Listening on port 4000...');

io.on('connection', (socket) => {
  socket.emit('chat-message', 'Hello from the server!');
  socket.on('send-chat-message', (message) => {
    console.log(message);
  });
});
