var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DocsModel = new Schema({
    nameDoc: { type: String },
    url: { type: String },
    type: { type: String },
	author: { 
		type: Schema.Types.ObjectId, 
		// required: true, 
		ref: "UserModel" 
	},
}, { timestamps: true });

module.exports = mongoose.model("DocsModel", DocsModel);
