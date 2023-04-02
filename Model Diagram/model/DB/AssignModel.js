var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var AssignModel = new Schema({
	nameAssign: { type: String },
	type: { type: String },
	quetions: [
		{ type: Schema.Types.ObjectId, required: true, ref: "QuetionModel" },
	],
});
