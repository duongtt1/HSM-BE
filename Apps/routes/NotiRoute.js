const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    getAllNoti,
    createNoti,
    deleteNoti,
    getNoti,
    getNotiMdw,
    updateNoti
} = require("../controllers/NotiController");

router.route("/").post(createNoti).get(getAllNoti);
router.get('/:id', getNotiMdw, getNoti)
router.delete('/:id', getNotiMdw, deleteNoti)

router.put('/:id', getNotiMdw, updateNoti);

module.exports = router;