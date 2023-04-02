var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ClassRoomModel = new Schema({
	idRoom: { type: String, required: true },
	nameRoom: { type: String },
	adminUser: [
		{ type: Schema.Types.ObjectId, required: true, ref: "UserModel" },
	],
	class: [{ type: Schema.Types.ObjectId, required: true, ref: "ClassModel" }],
	devices: [
		{ type: Schema.Types.ObjectId, required: true, ref: "DeviceModel" },
	],
});
