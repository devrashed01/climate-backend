const router = require("express").Router();

const { details } = require("../../controllers/admin/profileController");
const auth = require("../../middleware/auth");

router.use(auth);

router.get("/", details);

module.exports = router;
