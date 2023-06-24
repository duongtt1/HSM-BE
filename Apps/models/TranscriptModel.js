var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TranscriptModel = new Schema({
	student: { 
		type: Schema.Types.ObjectId, 
		required: true, 
		ref: "UserModel",
		unique: true
	},
	subject: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "SubjectModel",
		unique: true
	},
	progress: { type: Number, default: 0 },
	midTerm: { type: Number, default: 0 },
	endTerm: { type: Number, default: 0 },
	practice: { type: Number, default: 0 },
	overall: { type: Number, default: 0 },
});

module.exports = mongoose.model("TranscriptModel", TranscriptModel);