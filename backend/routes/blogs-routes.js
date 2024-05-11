const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const blogsControllers = require("../controllers/blogs-controllers");

router.get("/:id", blogsControllers.getBlogById);
router.get("/user/:id", blogsControllers.getBlogByUserId);
router.post(
  "/add-new",
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
