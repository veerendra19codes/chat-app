const router = require("express").Router()
const { getAllUsers } = require("../controllers/userController");

router.get("/", getAllUsers);

module.exports = router;