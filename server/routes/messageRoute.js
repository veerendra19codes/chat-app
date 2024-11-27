const { sendMessage, getMessages } = require("../controllers/messageController");

const router = require("express").Router();

router.post("/",sendMessage);
router.get("/", getMessages)

module.exports = router;