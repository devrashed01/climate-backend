const router = require("express").Router();

const auth = require("../../middleware/auth");
const {
  create,
  update,
  remove,
  list,
} = require("../../controllers/admin/postController");

router.use(auth);

router.post("/create", create);
router.put("/update/:id", update);
router.delete("/delete/:id", remove);
router.get("/list", list);

module.exports = router;
