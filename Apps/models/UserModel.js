var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserModel = new Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true
	},
	fullname: {
		type: String,
		required: true
	},
	school: {
		type: String,
		required: true
	},
	class: [{
		type: String,
	}],
	role: {
		type: String,
		required: true
	},
	faces: [{
		type: String,
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
	status: {
		type: String,
		default: "offline"
	},
	topics: [{
		type: String
	}],
	avatar: {
		type: String
	},
	deviceLogin: {
		type: String
	},
	inClass: {
		type: String
	},
	ip: {
		type: String
	},
});

module.exports = mongoose.model("UserModel", UserModel);