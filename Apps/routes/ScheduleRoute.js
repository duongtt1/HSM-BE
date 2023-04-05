const express = require("express");
const router = express.Router();

const {
    createSchedule,
    getAllSchedules,
    getAllScheduleByDevice,
    getScheduleByTeacher
} = require("../controllers/ScheduleController");

router.route("/").post(createSchedule).get(getAllSchedules);
router.route("/devices/:id").get(getAllScheduleByDevice);
router.route("/teacher/:id").get(getScheduleByTeacher);


module.exports = router;