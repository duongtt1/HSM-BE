const UserModel = require("../../models/UserModel");

module.exports = () => {
    const setOnline = async function (token) {
        const updateFields = {};
        updateFields["status"] = "online";
        await UserModel.updateOne({ username: token }, { $set: updateFields });
        const updatedUser = await UserModel.findOne({ username: token });
    };

    const setOffline = async function (token) {
        const updateFields = {};
        updateFields["status"] = "offline";
        updateFields["deviceLogin"] = "offline";
        await UserModel.updateOne({ username: token }, { $set: updateFields });
        // console.log("update offline");
        
        const updatedUser = await UserModel.findOne({ username: token });
    };

    return {
        setOnline,
        setOffline
    }
}