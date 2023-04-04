const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    getInfoRoomFromIdDevice
} = require("../controllers/BootingController");

router.route("/devices/:id").get(getInfoRoomFromIdDevice);

module.exports = router;