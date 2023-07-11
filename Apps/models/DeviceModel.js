var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DeviceModel = new Schema({
	idDevice: {
		type: String,
		required: true
	},
	nameDevice: {
		type: String,
		// required: true, 
	},
	room: {
		type: Schema.Types.ObjectId,
		ref: "ClassRoomModel",
		// unique: true
	},
	manager: {
		type: Schema.Types.ObjectId,
		ref: "UserModel",
	}
});

module.exports = mongoose.model("DeviceModel", DeviceModel);