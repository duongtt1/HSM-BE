const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    createQuetion,
    getAllQuetions,
    getQuetion,
    deleteQuetion,
    updateQuetion,
    getQuetionMdw,
    getQuetionCustomDA,
    addQuetionCustomDA
} = require("../controllers/QuetionController");

router.route("/").post(createQuetion).get(getAllQuetions);
router.get('/:id', getQuetionMdw, getQuetion)
router.get('/custom/:id', getQuetionCustomDA)
router.post('/custom/:id', addQuetionCustomDA)
router.delete('/:id', getQuetionMdw, deleteQuetion)

router.put('/:id', getQuetionMdw, updateQuetion);

module.exports = router;