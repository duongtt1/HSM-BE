var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AssignModel = new Schema({
	nameAssign: { type: String, required: true, unique: true },
	idAssign: {
		type: String
	},
	author: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "UserModel"
	},
	time: { type: Number, required: true, default: Date.now() },
	type: { type: String, enum: ["MC", "PDF"], default: "MC", required: true },
	doned: { type: Boolean, default: false },
	quetions: [
		{
			type: Schema.Types.ObjectId
			, ref: "QuetionModel"
		},
	],
	logs: [{ type: Object }],
	idclass: { type: Schema.Types.ObjectId, required: true, ref: "ClassModel" },
	resultOfStudent: [{
		// student: { type: Schema.Types.ObjectId, required: true, unique: true, ref: "UserModel" },
		// result: [{ type: String }],
		// point: { type: Number, default: 0 }
		type: Object
	}]
}, { timestamps: true });

module.exports = mongoose.model("AssignModel", AssignModel);