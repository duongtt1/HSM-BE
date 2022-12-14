const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    getStudentByID,
    getAllStudents
} = require("../controllers/student");

router.route("/:idStudent").get(protect, getStudentByID);
router.route("/getall").get(protect, getAllStudents);

module.exports = router;