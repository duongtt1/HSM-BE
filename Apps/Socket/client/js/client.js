const io = require('socket.io-client');
const socket = io.connect('http://localhost:4024')

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.emit('order:create', 'Hello, world!');

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('message', (data) => {
    console.log(`Received message: ${data}`);
});

socket.emit('message', 'Hello, world!');
