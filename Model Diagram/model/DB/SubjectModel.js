var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SubjectModel = new Schema({
	nameSubject: { type: String },
	idSubject: { type: String, required: true },
});
