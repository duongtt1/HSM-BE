var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var QuetionModel = new Schema({
	idQuetion: { type: String },
	type: { type: String },
	content: { type: String },
	answer: { type: String },
});
