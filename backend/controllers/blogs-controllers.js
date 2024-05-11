const HttpError = require("../models/http-error");
const BlogsModel = require("../models/blogs");

const getBlogById = async (req, res, next) => {
  const blogId = req.params.id;

  let blog;
  try {
    blog = await BlogsModel.findById(blogId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not find a blog.", 500)
    );
  }

  if (!blog) {
    return next(
      new HttpError("Could not find a blog for the provided id", 404)
    );
  }

  res.json({ blog: blog.toObject({ getters: true }) });
};

const getBlogByUserId = async (req, res, next) => {
  const userId = req.params.id;

  let blogs;

  try {
    blogs = await BlogsModel.find({ author: userId });
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not find a blog", 500)
    );
  }

  if (!blogs) {
    return next(
      new HttpError("Could not find a blog for the provided user id", 404)
    );
  }

  res.json({ blogs: blogs.map((blog) => blog.toObject({ getters: true })) });
};

const createBlog = async (req, res, next) => {
  const { title, description, category, author, address, coordinates } =
    req.body;

  const createdBlog = new BlogsModel({
    title,
    description,
    image:
      "https://as1.ftcdn.net/v2/jpg/02/45/68/40/1000_F_245684006_e55tOria5okQtKmiLLbY30NgEHTIB0Og.jpg",
    category,
    date: new Date(),
    author,
    address: category === "travel" ? address : undefined,
    coordinates: category === "travel" && coordinates,
  });

  try {
    await createdBlog.save();
  } catch (error) {
    return next(
      new HttpError("Creating a new blog failed, please try again", 500)
    );
  }

  res.status(201).json({ blog: createdBlog });
};

const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;

  let blog;
  try {
    blog = await BlogsModel.findById(blogId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not update a blog", 500)
    );
  }
  blog.title = title;
  blog.description = description;

  try {
    await blog.save();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not update a blog", 500)
    );
  }

  res.status(200).json({ blog: blog.toObject({ getters: true }) });
};

const deleteBlog = async (req, res, next) => {
  const blogId = req.params.id;

  let blog;
  try {
    blog = await BlogsModel.findByIdAndDelete(blogId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not delete a blog", 500)
    );
  }

  res.status(200).json({ message: "Deleted Successfully" });
};

exports.getBlogById = getBlogById;
exports.getBlogByUserId = getBlogByUserId;
exports.createBlog = createBlog;
exports.updateBlog = updateBlog;
exports.deleteBlog = deleteBlog;
