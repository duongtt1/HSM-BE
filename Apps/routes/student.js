const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    getStudentByID,
    getAllStudents,
    deleteStudentByID,
    updateStudentByID
} = require("../controllers/student");

router.route("/:idStudent")
    .get(protect, getStudentByID)
    .delete(protect, authorize("admin"), deleteStudentByID)
    .put(protect, authorize("admin"), updateStudentByID);

router.route("/getall").get(protect, getAllStudents);

module.exports = router;