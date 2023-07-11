const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    createLog,
    getLogByUserID
} = require("../controllers/LogController");

router.route("/add").post(createLog)
router.route("/:userID").get(getLogByUserID)

module.exports = router;