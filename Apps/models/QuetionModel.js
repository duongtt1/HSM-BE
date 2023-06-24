var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var QuetionModel = new Schema({
	idQuetion: { type: String, required: true, unique: true },
	type: { type: String, enum: ["MC", "PDF"], default: "MC", required: true },
	content: { type: String, required: true },
	answer: { type: String },
});

module.exports = mongoose.model("QuetionModel", QuetionModel);