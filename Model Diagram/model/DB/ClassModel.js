var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ClassModel = new Schema({
	nameClass: { type: String },
	classID: { type: String },
	members: [{ type: Schema.Types.ObjectId, ref: "UserModel" }],
	docs: [{ type: Schema.Types.ObjectId, ref: "DocsModel" }],
	assigns: [{ type: Schema.Types.ObjectId, ref: "AssignModel" }],
	room: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "ClassRoomModel",
	},
	subject: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "SubjectModel",
	},
});
