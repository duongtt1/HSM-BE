const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const Subjects = require("../models/ModelSubject");

/**
 * @desc    Create class
 */
exports.createSubject = asyncHandler(async (req, res, next) => {
    const subject = await Subjects.create(req.body);

    if (!subject) { 
        return next(new ErrorResponse(`Subject create error`, 404)); 
    }

    res.status(200).json({ success: true, data: subject });
});

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
 * @desc    Get All subjects
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
    const subject = await Subjects.findOneAndUpdate({ idSubject: req.params.idSubject }, req.body);
    
    if (!subject) { 
        return next(new ErrorResponse(`Subject not found with id of ${req.body.idSubject}`, 404)); 
    }

    res.status(200).json({ success: true, data: subject });
});

/**
 * @desc    Delete subject by ID
 */
exports.deleteSubjectByID = asyncHandler(async (req, res, next) => {
    const subject = await Subjects.findOneAndDelete({idSubject: req.params.idSubject });
    
    if (!subject) { 
        return next(new ErrorResponse(`Subject not found with id of ${req.body.idSubject}`, 404)); 
    }

    res.status(200).json({ success: true });
});

/**
 * @desc    add class to subject by ID
 */
exports.addClassToSubjectByID = asyncHandler(async (req, res, next) => {
    const subject = await Subjects.findOne({idSubject: req.params.idSubject });
    
    if (!subject) { 
        return next(new ErrorResponse(`Subject not found with id of ${req.body.idSubject}`, 404)); 
    }

    subject.classes.push(req.body.idClass);

    subject.save().then((err, res) => {{ 
        if (err) { 
            return next(new ErrorResponse(`Subject not found with id of ${req.body.idSubject}`, 404)); 
        }
    }});

    res.status(200).json({ success: true });
});