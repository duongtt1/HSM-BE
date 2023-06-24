var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SubjectModel = new Schema({
	nameSubject: { type: String, required: true },
	idSubject: { type: String, unique: true , required: true },
});

module.exports = mongoose.model("SubjectModel", SubjectModel);