var mongoose = require("mongoose");
const { default: validator } = require("validator");
var Schema = mongoose.Schema;
// var jwt = require("jsonwebtoken");

// const bcrypt = require("bcryptjs");

var UserSchema = new Schema(
	{
		username: {
			type: String,
		},
		password: {
			type: String,
		},
		full_name: {
			type: String,
		},
		day_of_birth: {
			type: Date,
			required: true,
			min: "1945-02-09",
			max: "2006-01-01",
		},
		gender: {
			type: String,
			required: true,
			enum: ["Nam", "Nữ"],
		},
		ic_number: {
			type: String,
			required: true,
			trim: true,
			maxlength: 12,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			minlength: 12,
			maxlength: 100,
			lowercase: true,
			trim: true,
			unique: true,
			validate: (value) => {
				if (!validator.isEmail(value)) {
					throw new Error({ error: "Invalid Email" });
				}
			},
		},
		telephone: {
			type: String,
			required: true,
			trim: true,
			minlength: [10, "Buộc phải nhiều hơn 10 ký tự"],
			maxlength: [10, "Buộc phải nhỏ hơn 10 ký tự"],
			validate: (value) => {
				if (!validator.isMobilePhone(value, "vi-VN")) {
					throw new Error("invalid SDT");
				}
			},
		},
		// qr_code: { type: String },
		// usernameOpenfire: { type: String },
		// passwordOpenfire: { type: String },
		token: {
			type: String,
		},

		unreadNotification: { type: Boolean, default: false },
		role: {
			type: String,
			enum: ["teacher", "student", "admin"],
			default: "student",
		},
		class: {
			type: String,
		},
		uni: {
			type: String,
		},
		codeuser: {
			type: String,
		},
		country: {
			type: String,
		},
		avatar: { type: String },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
