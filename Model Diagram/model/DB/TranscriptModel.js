var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var TranscriptModel = new Schema({
	student: { type: Schema.Types.ObjectId, required: true, ref: "UserModel" },
	subject: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "SubjectModel",
	},
	progress: { type: Number },
	midTerm: { type: Number },
	endTerm: { type: Number },
	practice: { type: Number },
	overall: { type: Number },
});
