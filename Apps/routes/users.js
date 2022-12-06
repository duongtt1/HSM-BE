const express = require("express");
const router = express.Router();

const {
	getUsers, // get all users
	getUser, // get one user
	createUser, // create one user
	updateUser, // edit one user
	deleteUser, // delete one user
} = require("../controllers/users");

router.route("/").get(getUsers).post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
