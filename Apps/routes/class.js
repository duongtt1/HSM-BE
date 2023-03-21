const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    getAllClass,
    getClassByID,
    createClass,
    getStudentsOfClassByID,
    getTeachersOfClassByID,
    getAssignmentsOfClassByID,
    deleteClassByID,
    updateClassByID,
    addTeacherToClassByID,
    addStudentToClassByID,
    addAssginmentsToClassByID,
    getClassTodayByIdTeacher
} = require("../controllers/class");


router.route("/today/:idTeacher").get(getClassTodayByIdTeacher);


module.exports = router;