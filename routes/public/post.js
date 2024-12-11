const router = require("express").Router();

const { list, detail } = require("../../controllers/public/postController");

router.get("/list", list);
router.get("/detail/:id", detail);

module.exports = router;
