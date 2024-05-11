const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const getCoordinates = require("../util/location");
const BlogsModel = require("../models/blogs");
const UsersModel = require("../models/users");
const mongoose = require("mongoose");

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

  let userWithBlogs;
  try {
    userWithBlogs = await UsersModel.findById(userId).populate("blogs");
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not find a blog", 500)
    );
  }

  if (!userWithBlogs || userWithBlogs.blogs.length === 0) {
    return next(
      new HttpError("Could not find a blog for the provided user id", 404)
    );
  }

  res.json({
    blogs: userWithBlogs.blogs.map((blog) => blog.toObject({ getters: true })),
  });
};

const createBlog = async (req, res, next) => {
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, category, author, address } = req.body;

  let coordinates;
  if (address) {
    try {
      coordinates = await getCoordinates(address);
    } catch (err) {
      return next(err);
    }
  }

  let user;
  try {
    user = await UsersModel.findById(author);
  } catch (err) {
    return next(
      new HttpError("Creating a blog failed, please try again.", 500)
    );
  }

  if (!user) {
    return next(new HttpError("Could not find user for provided id", 404));
  }

  const createdBlog = new BlogsModel({
    title,
    description,
    image:
      "https://as1.ftcdn.net/v2/jpg/02/45/68/40/1000_F_245684006_e55tOria5okQtKmiLLbY30NgEHTIB0Og.jpg",
    category,
    date: new Date(),
    author,
    address: category === "travel" ? address : undefined,
    coordinates: coordinates ? coordinates : undefined,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdBlog.save({ session });
    user.blogs.push(createdBlog);
    await user.save({ session });
    await session.commitTransaction();
  } catch (error) {
    return next(
      new HttpError("Creating a new blog failed, please try again", 500)
    );
  }

  res.status(201).json({ blog: createdBlog });
};

const updateBlog = async (req, res, next) => {
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

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
    blog = await BlogsModel.findById(blogId).populate("author");
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not delete a blog", 500)
    );
  }

  if (!blog) {
    return next(new HttpError("Could not find blog for this id", 404));
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.deleteOne({ session });
    blog.author.blogs.pull(blog);
    await blog.author.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not delete a blog", 500)
    );
  }

  res.status(200).json({ message: `Deleted Successfully` });
};

exports.getBlogById = getBlogById;
exports.getBlogByUserId = getBlogByUserId;
exports.createBlog = createBlog;
exports.updateBlog = updateBlog;
exports.deleteBlog = deleteBlog;
