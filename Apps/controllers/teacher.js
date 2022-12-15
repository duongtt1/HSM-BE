const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const Teachers = require("../models/ModelTeacher");

/**
 * @desc    Get teacher by ID
 */
exports.getTeacherByID = asyncHandler(async (req, res, next) => {
	var { idTeacher } = req.params

    const teacher = await Teachers.findOne({idTeacher}).select("-password -token -__v");
    if (!teacher) { 
        return next(new ErrorResponse(`Teacher not found with id of ${idTeacher}`, 404)); 
    }

    res.status(200).json({ success: true, data: teacher });
});

/**
 * @desc    Get All students
 */
exports.getAllTeachers = asyncHandler(async (req, res, next) => {
    const list_teacher = await Teachers.find().select("-password -token -__v");
    
    if (!list_teacher) { 
        return next(new ErrorResponse(`Teacher not found with id of ${idTeacher}`, 404)); 
    }

    res.status(200).json({ success: true, data: list_teacher });
});

/**
 * @desc    Edit teacher by ID
 */
exports.updateTeacherByID = asyncHandler(async (req, res, next) => {
    delete req.body.token;
    const teacher = await Teachers.findOneAndUpdate({ idTeacher:req.body.idTeacher }, req.body);
    
    if (!teacher) { 
        return next(new ErrorResponse(`Teacher not found with id of ${idTeacher}`, 404)); 
    }

    res.status(200).json({ success: true, data: teacher });
});

/**
 * @desc    Delete teacher by ID
 */
exports.deleteTeacherByID = asyncHandler(async (req, res, next) => {
    const teacher = await Teachers.findOneAndDelete({ idTeacher:req.body.idTeacher });
    
    if (!teacher) { 
        return next(new ErrorResponse(`Teacher not found with id of ${idTeacher}`, 404)); 
    }

    res.status(200).json({ success: true });
});
