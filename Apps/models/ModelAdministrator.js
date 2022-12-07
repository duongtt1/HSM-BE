var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ModelAdministrator = new Schema({
    fullname: { type: String, required: true },
});


module.exports = mongoose.model("ModelAdministrator", ModelAdministrator);