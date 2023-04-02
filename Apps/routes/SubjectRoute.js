const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    getAllSubjects,
    getSubject,
    createSubject,
    deleteSubject,
    updateSubject,
    getSubjectMdw
} = require("../controllers/SubjectController");

router.route("/").post(createSubject).get(getAllSubjects);
router.get('/:id', getSubjectMdw, getSubject)
router.delete('/:id', getSubjectMdw, deleteSubject)

router.put('/:id', getSubjectMdw, updateSubject);

module.exports = router;