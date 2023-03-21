const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    getInfoBooting
} = require("../controllers/booting");

router.route("/:id")
    .get(getInfoBooting);

module.exports = router;