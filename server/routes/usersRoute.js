const router = require("express").Router()
const { getAllUsers, getSingleUser } = require("../controllers/userController");

router.get("/", getAllUsers);
router.post("/getSingleUser", getSingleUser);

module.exports = router;