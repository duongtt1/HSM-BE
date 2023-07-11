const express = require("express");
const router = express.Router();

const {
    createSchedule,
    getAllSchedules,
    getAllScheduleByDevice,
    getScheduleByTeacher,
    getScheduleByTeacherID,
    getScheduleByDeviceStudent,
    getScheduleByStudent
} = require("../controllers/ScheduleController");

router.route("/").post(createSchedule).get(getAllSchedules);
router.route("/devices/:id").get(getAllScheduleByDevice);
router.route("/teacher/:id").get(getScheduleByTeacher);
router.route("/cus/teacher/:id").get(getScheduleByTeacherID);
router.route("/student/devices/:id").get(getScheduleByDeviceStudent);
router.route("/student/:id").get(getScheduleByStudent);

module.exports = router;