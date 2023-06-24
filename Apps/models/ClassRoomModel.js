var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ClassRoomModel = new Schema({
	idRoom: {
		type: String,
		required: true,
		unique: true
	},
	nameRoom: {
		type: String,
		required: true,
		unique: true
	},
	adminUser: [
		{
			type: Schema.Types.ObjectId,
			required: true, 
			ref: "UserModel",
			unique: true
		},
	],
	class: [
		{
			type: Schema.Types.ObjectId,
			required: true, 
			ref: "ClassModel",
			unique: true
		}
	],
	devices: [
		{
			type: Schema.Types.ObjectId,
			ref: "DeviceModel",
			unique: true
		},
	],
});

module.exports = mongoose.model("ClassRoomModel", ClassRoomModel);