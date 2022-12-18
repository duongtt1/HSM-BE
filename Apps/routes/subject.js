const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    getSubjectByID,
    getAllSubjects,
    updateSubjectByID,
    deleteSubjectByID
} = require("../controllers/subject");

router.route("/id/:idSubject")
    .get(protect, getSubjectByID)
    .delete(protect, authorize("admin"), deleteSubjectByID)
    .put(protect, authorize("admin"), updateSubjectByID);

router.route("/getall").get(protect, getAllSubjects);

module.exports = router;