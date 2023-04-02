const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    getAllTranscripts,
    getTranscript,
    createTranscript,
    deleteTranscript,
    updateTranscript,
    getTranscriptMdw
} = require("../controllers/TranscriptController");

router.route("/").post(createTranscript).get(getAllTranscripts);
router.get('/:id', getTranscriptMdw, getTranscript)
router.delete('/:id', getTranscriptMdw, deleteTranscript)

router.put('/:id', getTranscriptMdw, updateTranscript);

module.exports = router;