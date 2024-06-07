const socket = io('http://localhost:4000', { transports: ['websocket'] });
const messageForm = document.getElementById('chat-container');
const messageInput = document.getElementById('message-input');

socket.on('chat-message', (data) => {
  console.log(data);
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit('send-chat-message', message);
  messageInput.value = '';
});
