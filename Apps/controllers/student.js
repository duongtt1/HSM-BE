const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const Students = require("../models/ModelStudent");

/**
 * @desc    Get student by ID
 */
exports.getStudentByID = asyncHandler(async (req, res, next) => {
	var { idStudent } = req.params

    const student = await Students.findOne({idStudent}).select("-password -token -__v");
    
    if (!student) { 
        return next(new ErrorResponse(`Student not found with id of ${idStudent}`, 404)); 
    }

    res.status(200).json({ success: true, data: student });
});

/**
 * @desc    Get All students
 */
exports.getAllStudents = asyncHandler(async (req, res, next) => {
    const list_student = await Students.find().select("-password -token -__v");
    
    if (!list_student) { 
        return next(new ErrorResponse(`Student not found with id of ${idStudent}`, 404)); 
    }

    res.status(200).json({ success: true, data: list_student });
});

/**
 * @desc    Edit student by ID
 */
exports.updateStudentByID = asyncHandler(async (req, res, next) => {
    delete req.body.token;
    const student = await Students.findOneAndUpdate({ idStudent:req.body.idStudent }, req.body);
    
    if (!student) { 
        return next(new ErrorResponse(`Student not found with id of ${idStudent}`, 404)); 
    }

    res.status(200).json({ success: true, data: student });
});

/**
 * @desc    Delete student by ID
 */
exports.deleteStudentByID = asyncHandler(async (req, res, next) => {
    const student = await Students.findOneAndDelete({ idStudent:req.body.idStudent });
    
    if (!student) { 
        return next(new ErrorResponse(`Student not found with id of ${idStudent}`, 404)); 
    }

    res.status(200).json({ success: true });
});
