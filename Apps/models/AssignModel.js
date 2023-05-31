var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AssignModel = new Schema({
	nameAssign: { type: String },
	author: { 
		type: Schema.Types.ObjectId, 
		// required: true, 
		ref: "UserModel" 
	},
	time: { type: Number },
	type: { type: String },
	doned: { type: Boolean },
	quetions: [
		{ type: Schema.Types.ObjectId, required: true, ref: "QuetionModel" },
	],
	logs: [{ type: Object }],
	idclass: { type: Schema.Types.ObjectId, required: true, ref: "ClassModel" },
}, { timestamps: true});

module.exports = mongoose.model("AssignModel", AssignModel);