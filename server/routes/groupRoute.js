const { groupController } = require("../controllers/groupController");

const router = require("express").Router();

router.post("/",groupController);

module.exports = router;