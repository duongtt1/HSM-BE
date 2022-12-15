const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const Admins = require("../models/ModelAdministrator");

/**
 * @desc    Get admin by ID
 */
exports.getAdminByID = asyncHandler(async (req, res, next) => {
	var { idAdmin } = req.params

    const admin = await Admins.findOne({idAdmin}).select("-password -token -__v");
    if (!admin) { 
        return next(new ErrorResponse(`Admin not found with id of ${idAdmin}`, 404)); 
    }

    res.status(200).json({ success: true, data: admin });
});

/**
 * @desc    Get All admins
 */
exports.getAllAdmins = asyncHandler(async (req, res, next) => {
    const list_admin = await Admins.find().select("-password -token -__v");
    
    if (!list_admin) { 
        return next(new ErrorResponse(`Admin not found with id of ${idAdmin}`, 404)); 
    }

    res.status(200).json({ success: true, data: list_admin });
});

/**
 * @desc    Edit admin by ID
 */
exports.updateAdminByID = asyncHandler(async (req, res, next) => {
    delete req.body.token;
    const admin = await Admins.findOneAndUpdate({ idAdmin:req.body.idAdmin }, req.body);
    
    if (!admin) { 
        return next(new ErrorResponse(`Admin not found with id of ${idAdmin}`, 404)); 
    }

    res.status(200).json({ success: true, data: admin });
});

/**
 * @desc    Delete admin by ID
 */
exports.deleteAdminByID = asyncHandler(async (req, res, next) => {
    const admin = await Admins.findOneAndDelete({ idAdmin:req.body.idAdmin });
    
    if (!admin) { 
        return next(new ErrorResponse(`Admin not found with id of ${idAdmin}`, 404)); 
    }

    res.status(200).json({ success: true });
});
