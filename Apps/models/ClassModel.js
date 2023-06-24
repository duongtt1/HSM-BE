var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ClassModel = new Schema({
	nameClass: {
		type: String,
		require: true
	},
	classID: {
		type: String,
		require: true,
		unique: true
	},
	members: [{
		type: Schema.Types.ObjectId,
		ref: "UserModel",
		required: true,
		unique: true
	}],
	docs: [{
		type: Schema.Types.ObjectId,
		ref: "DocsModel",
		unique: true
	}],
	assigns: [{
		type: Schema.Types.ObjectId,
		ref: "AssignModel",
		unique: true
	}],
	room: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "ClassRoomModel",
	},
	subject: {
		type: Schema.Types.ObjectId,
		// required: true,
		ref: "SubjectModel",
	},
	teacher: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "UserModel",
	},
	startTime: {
		type: Number,
		required: true,
	},
	endTime: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		default: "offline",
	}
});

module.exports = mongoose.model("ClassModel", ClassModel);
