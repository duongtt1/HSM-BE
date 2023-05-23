require('colors')

const { setOnline, setOffline } = require("../user/userCtrl")();

module.exports = (io) => {
    const handleDisconnect = function (payload) {
        const socket = this;
        setOffline(socket.deviceId);
        console.log(
            `Client with id: ${socket.deviceId} disconnect to server`.yellow.bold
        );
    };

    return {
        handleDisconnect,
    }
}