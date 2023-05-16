const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    getDoc,
    getAllDocs,
    createDoc,
    deleteDoc,
    updateDoc,
    getDocMdw,
    getDocByAuthorMdw
} = require("../controllers/DocsController");

router.route("/").post(createDoc).get(getAllDocs);
router.get('/:id', getDocMdw, getDoc)
router.get('/author/:id', getDocByAuthorMdw, getDoc)
router.delete('/:id', getDocMdw, deleteDoc)

router.put('/:id', getDocMdw, updateDoc);

module.exports = router;