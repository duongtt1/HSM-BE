const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    getAllClassroom,
    getClassroom,
    getClassroomMdw,
    createClassroom,
    deleteClassroom,
    updateClassroom
} = require("../controllers/ClassroomController");

router.route("/").post(createClassroom).get(getAllClassroom);
router.get('/:id', getClassroomMdw, getClassroom)
router.delete('/:id', getClassroomMdw, deleteClassroom)

router.put('/:id', getClassroomMdw, updateClassroom);

module.exports = router;