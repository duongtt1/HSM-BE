const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    getAllClass,
    getClass,
    getClassMdw,
    createClass,
    deleteClass,
    updateClass
} = require("../controllers/ClassController");

router.route("/").post(createClass).get(getAllClass);
router.get('/:id', getClassMdw, getClass)
router.delete('/:id', getClassMdw, deleteClass)

router.put('/:id', getClassMdw, updateClass);

module.exports = router;