const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    getAllAdmins,
    getAdminByID,
    deleteAdminByID,
    updateAdminByID
} = require("../controllers/admin");

router.route("/:idAdmin")
    .get(protect, getAdminByID)
    .delete(protect, authorize("admin"), deleteAdminByID)
    .put(protect, authorize("admin"), updateAdminByID);

router.route("/getall").get(protect, getAllAdmins);

module.exports = router;