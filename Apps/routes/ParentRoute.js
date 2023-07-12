const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    createParent
} = require("../controllers/ParentController");

router.route("/").post(createParent)

module.exports = router;