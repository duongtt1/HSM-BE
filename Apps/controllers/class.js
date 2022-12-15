const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const Classes = require("../models/ModelClass");

/**
 * @desc    Create class
 */
exports.createClass = asyncHandler(async (req, res, next) => {
    const class_room = await Classes.create(req.body);

    if (!class_room) { 
        return next(new ErrorResponse(`Classroom create error`, 404)); 
    }

    res.status(200).json({ success: true, data: class_room });
});

/**
 * @desc    get list student of class by id
 */
exports.getStudentsOfClassByID = asyncHandler(async (req, res, next) => {
    var { idClass } = req.params

    // const class_room = await Classes.create(req.body);
    const classroom = await Classes.find({idClass})
                            .populate({
                                path: "listStudent",
                                populate: { path: "listStudent" , 
                                            select: 'idStudent fullname gender'},
                            });

    if (!classroom) { 
        return next(new ErrorResponse(`Classroom create error`, 404)); 
    }

    res.status(200).json({ success: true, data: classroom.listStudent });
});

/**
 * @desc    Get list Assignments by Class
 */
exports.getAssignmentsOfClassByID = asyncHandler(async (req, res, next) => {
    var { idClass } = req.params

    // const class_room = await Classes.create(req.body);
    const classroom = await Classes.find({idClass})
                            .populate({
                                path: "assignments",
                                populate: { path: "assignments" , 
                                            select: 'name idAssign quiz'},
                            });

    if (!classroom) { 
        return next(new ErrorResponse(`Classroom create error`, 404)); 
    }

    res.status(200).json({ success: true, data: classroom.assignments });
});

/**
 * @desc    Get list teacher by Class
 */
exports.getTeachersOfClassByID = asyncHandler(async (req, res, next) => {
    var { idClass } = req.params

    // const class_room = await Classes.create(req.body);
    const classroom = await Classes.find({idClass})
                            .populate({
                                path: "teachers",
                                populate: { path: "teachers" , 
                                            select: 'idTeacher fullname '},
                            });

    if (!classroom) { 
        return next(new ErrorResponse(`Classroom create error`, 404)); 
    }

    res.status(200).json({ success: true, data: classroom.assignments });
});


/**
 * @desc    Get class by ID
 */
exports.getClassByID = asyncHandler(async (req, res, next) => {
	var { idClass } = req.params

    const classroom = await Classes.findOne({idClass}).select("-password -token -__v");
    if (!classroom) { 
        return next(new ErrorResponse(`Classroom not found with id of ${idClass}`, 404)); 
    }

    res.status(200).json({ success: true, data: classroom });
});

/**
 * @desc    Get All class
 */
exports.getAllClass = asyncHandler(async (req, res, next) => {
    const list_class = await Classes.find().select("-password -token -__v");
    
    if (!list_class) { 
        return next(new ErrorResponse(`Class not found`, 404)); 
    }

    res.status(200).json({ success: true, data: list_class });
});

/**
 * @desc    Edit teacher by ID
 */
exports.updateClassByID = asyncHandler(async (req, res, next) => {
    delete req.body.token;
    const class_room = await Classes.findOneAndUpdate({ idClass: req.body.idClass }, req.body);
    
    if (!class_room) { 
        return next(new ErrorResponse(`Teacher not found with id of ${req.body.idClass}`, 404)); 
    }

    res.status(200).json({ success: true, data: class_room });
});

/**
 * @desc    Delete class by ID
 */
exports.deleteClassByID = asyncHandler(async (req, res, next) => {
    const class_room = await Classes.findOneAndDelete({ idClass: req.body.idClass });
    
    if (!class_room) { 
        return next(new ErrorResponse(`Teacher not found with id of ${req.body.idClass}`, 404)); 
    }

    res.status(200).json({ success: true });
});

/**
 * @desc    Add teacher to class
 */

/**
 * @desc    Add student to class
 */

/**
 * @desc    Add assginments to class
 */