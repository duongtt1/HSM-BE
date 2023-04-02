const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    getAllAttendance,
    getAttendance,
    getAttendanceMdw,
    createAttendance,
    deleteAttendance,
    updateAttendance
} = require("../controllers/AttendanceController");

router.route("/").post(createAttendance).get(getAllAttendance);
router.get('/:id', getAttendanceMdw, getAttendance)
router.delete('/:id', getAttendanceMdw, deleteAttendance)

router.put('/:id', getAttendanceMdw, updateAttendance);

module.exports = router;