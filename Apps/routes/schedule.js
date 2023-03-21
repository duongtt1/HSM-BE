const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    getScheduleByIdTeacher
} = require("../controllers/schedule");

router.route("/:idTeacher")
    .get(getScheduleByIdTeacher);

module.exports = router;