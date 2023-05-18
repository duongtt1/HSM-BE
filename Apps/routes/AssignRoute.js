const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    getAllAssign,
    getAssign,
    getAssignMdw,
    createAssign,
    deleteAssign,
    updateAssign,
    getAssignByAuthorMdw
} = require("../controllers/AssignController");

router.route("/").post(createAssign).get(getAllAssign);
router.get('/:id', getAssignMdw, getAssign)
router.get('/author/:id', getAssignByAuthorMdw, getAssign)
router.delete('/:id', getAssignMdw, deleteAssign)

router.put('/:id', getAssignMdw, updateAssign);

module.exports = router;