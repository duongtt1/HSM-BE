const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    getAllAdmins,
    getAdminByID,
    deleteAdminByID,
    updateAdminByID
} = require("../controllers/admin");

router.route("/id/:idAdmin")
    .get(protect, getAdminByID)
    .delete(protect, deleteAdminByID)
    .put(protect, updateAdminByID);

router.route("/getall").get(protect, getAllAdmins);

module.exports = router;