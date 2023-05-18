var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AssignModel = new Schema({
	nameAssign: { type: String },
	author: { 
		type: Schema.Types.ObjectId, 
		// required: true, 
		ref: "UserModel" 
	},
	type: { type: String },
	quetions: [
		{ type: Schema.Types.ObjectId, required: true, ref: "QuetionModel" },
	],
}, { timestamps: true});

module.exports = mongoose.model("AssignModel", AssignModel);