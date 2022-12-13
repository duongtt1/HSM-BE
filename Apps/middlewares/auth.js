const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

exports.protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	} else if (req.cookies.token) {
		// nếu đã đăng nhập trc rồi thì pass luôn
		token = req.cookies.token;
	}

	if (!token) {
		return next(new ErrorResponse("Bạn không có quyền truy cập", 401));
	}

	try {
		// Xác thực token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		// console.log(decoded);
		req.user = await User.findById(decoded.token);
		// console.log(req.user);
		next();
	} catch (err) {
		return next(new ErrorResponse("Bạn không có quyền truy cập", 401));
	}
});

exports.authorize = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new ErrorResponse(
					`no access to ${req.user.role}`,
					403
				)
			);
		}
		next();
	};
};
