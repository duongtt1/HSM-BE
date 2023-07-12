const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    getAllClass,
    getClass,
    getClassMdw,
    createClass,
    deleteClass,
    updateClass,
    getAllMemberClass,
    customClassFrontend,
    getAllStudentClass
} = require("../controllers/ClassController");

router.route("/").post(createClass).get(getAllClass);
router.get('/:id', getClassMdw, getClass)
router.get('/members/:id', getAllMemberClass)
router.delete('/:id', getClassMdw, deleteClass)
router.put('/:id', getClassMdw, updateClass);
router.get('/getallstudentinclass/:id', getAllStudentClass)

router.post('/customapi/getclassbyid', customClassFrontend)

module.exports = router;