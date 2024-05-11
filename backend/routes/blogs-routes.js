const express = require("express");
const router = express.Router();

const blogsControllers = require("../controllers/blogs-controllers");

router.get("/:id", blogsControllers.getBlogById);
router.get("/user/:id", blogsControllers.getBlogByUserId);
router.post("/add-new", blogsControllers.createBlog);
router.patch("/:id", blogsControllers.updateBlog);
router.delete("/:id", blogsControllers.deleteBlog);

module.exports = router;
