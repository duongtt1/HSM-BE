require('colors')

module.exports = (io) => {
    const handleDisconnect = function (payload) {
        const socket = this; 
        console.log(
            `Client with id: ${socket.deviceId} disconnect to server`.yellow.bold
        );
    };

    return {
        handleDisconnect,
    }
}