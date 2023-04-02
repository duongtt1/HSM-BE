var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserModel = new Schema({
	username: { type: String },
	password: { type: String },
	fullname: { type: String },
	school: { type: String },
	class: [{ type: String }],
	role: { type: String },
	faces: [{ type: String }],
	userID: { type: String, required: true },
});
