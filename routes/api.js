const router = require("express").Router();

router.use("/admin", require("./admin"));
router.use("/auth", require("./auth"));
router.use("/public", require("./public"));

module.exports = router;
