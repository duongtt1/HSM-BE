const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const Students = require("../models/ModelStudent");
const Teachers = require("../models/ModelTeacher");
const Admins = require("../models/ModelAdministrator");

/**
 * @desc    Register user
 */
exports.register = asyncHandler(async (req, res, next) => {
	if (req.body.role === "student") {
		const student = await Students.create(req.body);
		if (!student) {
			return next(new ErrorResponse("Student not created", 400));
		} else {
			res.status(200).json({ success: true });
		}
	} else if (req.body.role === "teacher") {
		const teacher = await Teachers.create(req.body);
		if (!teacher) {
			return next(new ErrorResponse("Teacher not created", 400));
		} else {
			res.status(200).json({ success: true });
		}
	} else if (req.body.role === "admin") {
		const admin = await Admins.create(req.body);
		if (!admin) {
			return next(new ErrorResponse("Admin not created", 400));
		} else {
			res.status(200).json({ success: true });
		}
	} else {
		return next(new ErrorResponse("Role not found", 400));
	}
});


/**
 * @desc    Login user
 */
exports.login = asyncHandler(async (req, res, next) => {
	var { username, password } = req.body;
	// console.log(req.body)
	if (!username || !password) {
		return next(new ErrorResponse("Please provide an email and password", 400));
	}
	iduser = username.toLowerCase();
	// Check for user
	if (req.body.role === "student") {
		idStudent = iduser;
		const student = await Students.findOne({ idStudent }).select("+password");
		if (!student) {
			return next(new ErrorResponse("Invalid credentials", 401));
		}
		const isMatch = await student.matchPassword(password);
		if (!isMatch) {
			return next(new ErrorResponse("Invalid credentials", 401));
		}
		res.status(200).json({ success: true, token: student.token });
	}else if (req.body.role === "teacher"){
		idTeacher = iduser;
		const teacher = await Teachers.findOne({ idTeacher }).select("+password");
		if (!teacher) {
			return next(new ErrorResponse("Invalid credentials", 401));
		}
		const isMatch = await teacher.matchPassword(password);
		if (!isMatch) {
			return next(new ErrorResponse("Invalid credentials", 401));
		}
		res.status(200).json({ success: true, token: teacher.token });
	}else if (req.body.role === "admin"){
		idAdmin = iduser;
		const admin = await Admins.findOne({ idAdmin }).select("+password");
		if (!admin) {
			return next(new ErrorResponse("Invalid credentials", 401));
		}
		const isMatch = await admin.matchPassword(password);
		if (!isMatch) {
			return next(new ErrorResponse("Invalid credentials", 401));
		}
		res.status(200).json({ success: true, token: admin.token });
	}
});
