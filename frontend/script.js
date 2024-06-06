const socket = io('http://localhost:4000', { transports: ['websocket'] });

socket.on('chat-message', (data) => {
  console.log(data);
});
