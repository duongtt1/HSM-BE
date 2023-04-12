const jwt = require('jsonwebtoken');
const UserModel = require('../../models/UserModel');
const DeviceModel = require('../../models/DeviceModel');

module.exports = (io) => {
    const verifyToken = (socket, next) => {
        const token = socket.handshake.query.token;
        try {
            
            room = "mtcl";
            topics = {
                "control": "mtcl:control",
                "device": token,
            }

            socket.room = room;
            socket.topics = topics;

            socket.deviceId = token;
            next();
        } catch (error) {
            console.error(`Error authenticating user: ${error.message}`);
            next(new Error('Authentication error'));
        }
    }

    return {
        verifyToken,
    }
}