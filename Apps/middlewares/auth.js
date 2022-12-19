const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const Students = require("../models/ModelStudent");
const Teachers = require("../models/ModelTeacher");
const Admins = require("../models/ModelAdministrator");

exports.protect = asyncHandler(async (req, res, next) => {
	let token = req.body.token;
	console.log(req.body);
	if (!token) {
		return next(new ErrorResponse("Denied", 401));
	}

	try {
		// verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		// console.log(decoded);
		if (await Students.findById(decoded._id)){
			req.role = "student"
		}else if (await Teachers.findById(decoded._id)){
			req.role = "teacher"
		}else if (await Admins.findById(decoded._id)){
			req.role = "admin"
		}else{
			return next(new ErrorResponse("Denied", 401));
		}

		next();
	} catch (err) {
		return next(new ErrorResponse("Denied", 401));
	}
});

exports.authorize = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.role)) {
			return next(
				new ErrorResponse(
					`no access to ${req.role}`,
					403
				)
			);
		}
		next();
	};
};
