var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var QuetionModel = new Schema({
	idQuetion: { type: String, required: true, unique: true },
	type: { type: String, enum: ["MC", "PDF"], default: "MC", required: true },
	content: { type: String, required: true },
	correctAnswer: { type: String },
	answers: {
		A: { type: String },
		B: { type: String },
		C: { type: String },
		D: { type: String },
	}
});

module.exports = mongoose.model("QuetionModel", QuetionModel);