const router = require("express").Router();

const { create, login, changePassword } = require("../controllers/auth");
const auth = require("../middleware/auth");

router.post("/register", create);
router.post("/login", login);
router.put("/changePassword", auth, changePassword);

module.exports = router;
