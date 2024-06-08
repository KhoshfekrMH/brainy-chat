const socket = io('http://localhost:4000', { transports: ['websocket'] });
const messageContainer = document.getElementById('chat-box');
const messageForm = document.getElementById('chat-container');
const messageInput = document.getElementById('message-input');

const username = prompt('what is your name?');
appendMessage(`${username} joined chat`);
socket.emit('new-user', username);

function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}

socket.on('chat-message', (data) => {
  appendMessage(`${data.username}: ${data.message}`);
});

socket.on('user-connected', (username) => {
  appendMessage(`${username} connected`);
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit('send-chat-message', message);
  messageInput.value = '';
});
