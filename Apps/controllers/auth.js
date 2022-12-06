const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

exports.login = asyncHandler(async (req, res, next) => {
	console.log(req.body)
	const user = await User.findOne({ username: req.body.username }).exec();
	
	if (!user){
    	return next(
    			new ErrorResponse(`Không tìm thấy người có id: ${req.body.id}`)
    		);
	}else{
	    if (user.password === req.body.password){
	        res.status(200).json({ success: true, data: user });
	    }else{
	        res.status(500).json({ success: false });
	    }
	}
});
