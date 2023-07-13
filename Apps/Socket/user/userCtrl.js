const UserModel = require("../../models/UserModel");
const axios = require("axios")

module.exports = () => {
    const setOnline = async function (token) {
        const updateFields = {};
        updateFields["status"] = "online";
        // updateFields["ip"] = "online";
        await UserModel.updateOne({ username: token }, { $set: updateFields });
        // const updatedUser = await UserModel.findOne({ username: token });
    };

    const setIP = async function (socket, token) {
        const updateFields = {};
        __reponse = await axios.default.get("https://ipinfo.io/json");
        console.log(__reponse.data)
        updateFields["ip"] = __reponse.data.ip;
        socket.userip = __reponse.data.ip;
        // console.log(socket.handshake.address)
        await UserModel.updateOne({ username: token }, { $set: updateFields });
    };

    const setOffline = async function (token) {
        const updateFields = {};
        updateFields["status"] = "offline";
        updateFields["deviceLogin"] = "offline";
        await UserModel.updateOne({ username: token }, { $set: updateFields });
        // console.log("update offline");
        
        // const updatedUser = await UserModel.findOne({ username: token });
    };

    return {
        setOnline,
        setOffline,
        setIP
    }
}