const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    getAllTeachers,
    getTeacherByID,
    deleteTeacherByID,
    updateTeacherByID
} = require("../controllers/teacher");

router.route("/:idTeacher")
    .get(protect, getTeacherByID)
    .delete(protect, authorize("admin"), deleteTeacherByID)
    .put(protect, authorize("admin"), updateTeacherByID);

router.route("/getall").get(protect, getAllTeachers);

module.exports = router;