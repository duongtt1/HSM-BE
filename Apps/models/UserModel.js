var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserModel = new Schema({
	username: {
		type: String
	},
	password: {
		type: String
	},
	fullname: {
		type: String
	},
	school: {
		type: String
	},
	class: [{
		type: String
	}],
	role: {
		type: String
	},
	faces: [{
		type: String
	}],
	userID: {
		type: String,
		required: true,
		unique: true
	},
	phoneNumber: {
		type: String
	},
	email: {
		type: String
	},
	dayOfBirth: {
		type: Date
	},
	role: {
		type: String
	},
	status: {
		type: String
	},
	topics: [{
		type: String
	}],
});

module.exports = mongoose.model("UserModel", UserModel);