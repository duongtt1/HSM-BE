const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const Subjects = require("../models/ModelSubject");

/**
 * @desc    Get subject by ID
 */
exports.getSubjectByID = asyncHandler(async (req, res, next) => {
	var { idSubject } = req.params

    const subject = await Subjects.findOne({idSubject});
    
    if (!subject) { 
        return next(new ErrorResponse(`Subject not found with id of ${idSubject}`, 404)); 
    }

    res.status(200).json({ success: true, data: subject });
});

/**
 * @desc    Get All students
 */
exports.getAllSubjects = asyncHandler(async (req, res, next) => {
    const list_subjects = await Subjects.find();
    
    if (!list_subjects) { 
        return next(new ErrorResponse(`Subject not found`, 404)); 
    }

    res.status(200).json({ success: true, data: list_subjects });
});

/**
 * @desc    Edit subject by ID
 */
exports.updateSubjectByID = asyncHandler(async (req, res, next) => {
    delete req.body.token;
    const subject = await Students.findOneAndUpdate({ idSubject: req.body.idSubject }, req.body);
    
    if (!subject) { 
        return next(new ErrorResponse(`Subject not found with id of ${req.body.idSubject}`, 404)); 
    }

    res.status(200).json({ success: true, data: subject });
});

/**
 * @desc    Delete subject by ID
 */
exports.deleteSubjectByID = asyncHandler(async (req, res, next) => {
    const subject = await Students.findOneAndDelete({idSubject: req.body.idSubject });
    
    if (!subject) { 
        return next(new ErrorResponse(`Subject not found with id of ${req.body.idSubject}`, 404)); 
    }

    res.status(200).json({ success: true });
});