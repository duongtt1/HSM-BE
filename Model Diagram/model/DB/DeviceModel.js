var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var DeviceModel = new Schema({
	idDevice: { type: String, required: true },
	nameDevice: { type: String },
	room: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "ClassRoomModel",
	},
});
