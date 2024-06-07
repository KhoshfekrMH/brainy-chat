const socket = io('http://localhost:4000', { transports: ['websocket'] });
const messageContainer = document.getElementById('chat-box');
const messageForm = document.getElementById('chat-container');
const messageInput = document.getElementById('message-input');

function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}

socket.on('chat-message', (data) => {
  appendMessage(data);
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit('send-chat-message', message);
  messageInput.value = '';
});
