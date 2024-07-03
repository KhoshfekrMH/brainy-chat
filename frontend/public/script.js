const socket = io('http://localhost:3000', {transports: ['websocket']});
const messageContainer = document.getElementById('chat-box');
const roomContainer = document.getElementById('room-container');
const messageForm = document.getElementById('chat-container');
const messageInput = document.getElementById('message-input');

if (messageForm != null) {
    let username;
    while (!username) {
        username = prompt('Enter username');
        if (!username) {
            alert('Please enter a username');
        }
    }
    appendMessage(`${username} joined chat`);
    socket.emit('new-user', roomName, username);

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value;
        appendMessage(`You: ${message}`);
        socket.emit('send-chat-message', roomName, message);
        messageInput.value = '';
    });
}

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}

socket.on('room-created', (room) => {
    const roomElement = document.createElement('div');
    roomElement.innerText = room;
    const roomLink = document.createElement('a')
    roomLink.href = `/${room}`;
    roomLink.innerText = 'Join';
    roomContainer.append(roomElement, roomLink);
});

socket.on('chat-message', (data) => {
    appendMessage(`${data.username}: ${data.message}`);
});

socket.on('user-connected', (username) => {
    appendMessage(`${username} connected`);
});

socket.on('user-disconnected', (username) => {
    appendMessage(`${username} disconnected`);
});
