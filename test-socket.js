const io = require('socket.io-client');

// Connect to the Socket.IO server
const socket = io('http://127.0.0.1:4024');

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.emit('test:stress', 'room:testing');

const data = {
    room: 'room:testing',
    message: 'Hello, room!',
    timestamp: Date.now()
};
socket.emit('emitToRoom', data);

// setTimeout(() => {
//     const data = {
//         room: 'room:testing',
//         message: 'Hello, room!',
//         timestamp: Date.now()
//     };
//     socket.emit('emitToRoom', data);
// }, 5900); 


socket.on('room:testing:back', (data) => {
    console.log(`Received from room room:testing:back:`, data.message);
    console.log(`Time delay to emit to room: ${Date.now() - data.message.statTime}ms`);
});

// Disconnect from the server
socket.on('disconnect', () => {
    console.log('Disconnected from server');
});
