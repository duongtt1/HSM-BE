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
} = require("../controllers/class");

router.route("/:idClass")
    .get(protect, getClassByID)
    .delete(protect, authorize("admin"), deleteClassByID)
    .put(protect, authorize("admin"), updateClassByID)
    .post(protect, authorize("admin"), createClass);

router.route("/getall").get(protect, getAllClass);
router.route("/getstudent/:idClass").get(protect, getStudentsOfClassByID);
router.route("/getteacher/:idClass").get(protect, getTeachersOfClassByID);
router.route("/getassign/:idClass").get(protect, getAssignmentsOfClassByID);

module.exports = router;