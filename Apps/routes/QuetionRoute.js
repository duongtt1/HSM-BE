const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    createQuetion,
    getAllQuetions,
    getQuetion,
    deleteQuetion,
    updateQuetion,
    getQuetionMdw
} = require("../controllers/QuetionController");

router.route("/").post(createQuetion).get(getAllQuetions);
router.get('/:id', getQuetionMdw, getQuetion)
router.delete('/:id', getQuetionMdw, deleteQuetion)

router.put('/:id', getQuetionMdw, updateQuetion);

module.exports = router;