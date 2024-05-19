const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const blogsControllers = require("../controllers/blogs-controllers");
const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");

router.get("/", blogsControllers.getBlogs);
router.get("/:id", blogsControllers.getBlogById);
router.get("/user/:id", blogsControllers.getBlogsByUserId);

router.use(checkAuth);

router.post(
  "/add-new",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 10 }),
    check("category").not().isEmpty(),
  ],
  blogsControllers.createBlog
);
router.patch(
  "/:id",
  [check("title").not().isEmpty(), check("description").isLength({ min: 10 })],
  blogsControllers.updateBlog
);
router.delete("/:id", blogsControllers.deleteBlog);

module.exports = router;
