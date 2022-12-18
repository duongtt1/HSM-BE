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
} = require("../controllers/class");

router.route("/").post(protect, createClass);

router.route("/id/:idClass")
    .get(protect, getClassByID)
    .delete(protect, deleteClassByID)
    .put(protect, updateClassByID)
    .post(protect, createClass);

router.route("/getall").get(protect, getAllClass);
router.route("/student/:idClass")
    .get(protect, getStudentsOfClassByID)
    .post(protect, addStudentToClassByID);
router.route("/teacher/:idClass")
    .get(protect, getTeachersOfClassByID)
    .post(protect, addTeacherToClassByID);
router.route("/assign/:idClass")
    .get(protect, getAssignmentsOfClassByID)
    .post(protect, addAssginmentsToClassByID);

module.exports = router;