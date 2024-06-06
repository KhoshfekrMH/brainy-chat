const io = require('socket.io')(4000);

console.log('Listening on port 4000...');

io.on('connection', (socket) => {
  console.log('new User');
  socket.emit('chat-message', 'Hello from the server!');
});
