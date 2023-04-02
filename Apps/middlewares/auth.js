const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");

exports.protect = asyncHandler(async (req, res, next) => {
	let token = req.headers.token;
	
	if (!token) {
		return next(new ErrorResponse("Denied", 401));
	}

	try {
		// // verify token
		// const decoded = jwt.verify(token, process.env.JWT_SECRET);
		// // console.log(decoded);
		// if (await Students.findById(decoded._id)){
		// 	req.role = "student"
		// }else if (await Teachers.findById(decoded._id)){
		// 	req.role = "teacher"
		// }else if (await Admins.findById(decoded._id)){
		// 	req.role = "admin"
		// }else{
		// 	return next(new ErrorResponse("Denied", 401));
		// }

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
