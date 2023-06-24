const express = require("express");
const router = express.Router();

const {
    createSchedule,
    getAllSchedules,
    getAllScheduleByDevice,
    getScheduleByTeacher,
    getScheduleByTeacherID
} = require("../controllers/ScheduleController");

router.route("/").post(createSchedule).get(getAllSchedules);
router.route("/devices/:id").get(getAllScheduleByDevice);
router.route("/teacher/:id").get(getScheduleByTeacher);
router.route("/cus/teacher/:id").get(getScheduleByTeacherID);


module.exports = router;