const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    getUserMdw,
    createUser,
    getAllUser,
    getUser,
    deleteUser,
    updateUser
} = require("../controllers/UserController");

router.route("/").post(createUser).get(getAllUser);
router.get('/:id', getUserMdw, getUser)
router.delete('/:id', getUserMdw, deleteUser)

router.put('/:id', getUser, updateUser);

module.exports = router;