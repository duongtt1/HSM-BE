const express = require("express");
const router = express.Router();

const {
    createSchedule,
    getAllSchedules,
    getAllScheduleByDevice
} = require("../controllers/ScheduleController");

router.route("/").post(createSchedule).get(getAllSchedules);
router.route("/devices/:id").get(getAllScheduleByDevice);

module.exports = router;