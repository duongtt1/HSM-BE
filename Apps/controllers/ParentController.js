const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const UserModel = require("../models/UserModel");
const ParentModel = require("../models/ParentModel");

exports.createParent = asyncHandler(async (req, res, next) => {
    try {
        const newParent = new ParentModel(req.body);
        const savedParent = await newParent.save();
        res.status(201).json({
            success: true
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});