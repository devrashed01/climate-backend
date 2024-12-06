const router = require("express").Router();

const { list } = require("../../controllers/public/postController");

router.get("/list", list);

module.exports = router;
