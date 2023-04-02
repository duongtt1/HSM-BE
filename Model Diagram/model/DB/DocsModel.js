var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var DocsModel = new Schema({
	nameDoc: { type: String },
	url: { type: String },
	type: { type: String },
});
