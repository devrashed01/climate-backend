const router = require("express").Router();

const { list } = require("../../controllers/admin/postController");

router.get("/list", list);

module.exports = router;
