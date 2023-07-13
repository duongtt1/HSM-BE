require('colors')

const { setOnline, setOffline } = require("../user/userCtrl")();

module.exports = (io) => {
    const handleDisconnect = function (payload) {
        const socket = this;
        setOffline(socket.deviceId);
        msgLogout = `${socket.deviceId}_offline`
        msgLeaveClass = `${socket.deviceId}_leaveclass`
        // console.log(`${socket.classid}:activate`)
        // console.log(msgLogout)
        io.emit(`${socket.classid}:activate`, msgLogout);
        io.emit(`${socket.classid}:status`, msgLeaveClass);
        console.log(
            `Client with id: ${socket.deviceId} disconnect to server`.yellow.bold
        );
        socket.leave("room:testing")
    };

    return {
        handleDisconnect,
    }
}