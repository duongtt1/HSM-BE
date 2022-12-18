const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    getSubjectByID,
    getAllSubjects,
    updateSubjectByID,
    deleteSubjectByID,
    createSubject,
    addClassToSubjectByID
} = require("../controllers/subject");

router.route("/").post(protect, createSubject);

router.route("/id/:idSubject")
    .get(protect, getSubjectByID)
    .delete(protect, deleteSubjectByID)
    .put(protect, updateSubjectByID);

router.route("/update/:idSubject").put(protect, addClassToSubjectByID);

router.route("/getall").get(protect, getAllSubjects);

module.exports = router;