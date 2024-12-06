const router = require("express").Router();

router.use("/post", require("./post"));
router.use("/profile", require("./profile"));

module.exports = router;
