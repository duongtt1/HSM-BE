require('colors')

const { setOnline, setOffline } = require("../user/userCtrl")();

module.exports = (io) => {
    const handleDisconnect = function (payload) {
        const socket = this;
        setOffline(socket.deviceId);
        io.emit(`${socket.classid}:disconnected`, socket.deviceId);
        console.log(
            `Client with id: ${socket.deviceId} disconnect to server`.yellow.bold
        );
        socket.leave("room:testing")
    };

    return {
        handleDisconnect,
    }
}