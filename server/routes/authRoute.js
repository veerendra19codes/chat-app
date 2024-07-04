const { registerController, loginController, validUser } = require("../controllers/userController");
const authenticate = require("../middlewares/authenticate");

const router = require("express").Router()


router.post("/register", registerController)
router.post("/login",  loginController);
router.get("/validUser", authenticate, validUser);

module.exports = router;

