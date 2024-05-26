const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const getCoordinates = require("../util/location");
const BlogsModel = require("../models/blogs");
const UsersModel = require("../models/users");
const mongoose = require("mongoose");
const fs = require("fs");

const getBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await BlogsModel.find();
  } catch (err) {
    return next(
      new HttpError("Fetching blogs failed, please try again later", 500)
    );
  }

  res.json({ data: blogs.map((blog) => blog.toObject({ getters: true })) });
};

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

  res.json({ data: blog.toObject({ getters: true }) });
};

const getBlogsByUserId = async (req, res, next) => {
  const userId = req.params.id;

  let userWithBlogs;
  try {
    userWithBlogs = await UsersModel.findById(userId).populate("blogs");
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not find a blog", 500)
    );
  }

  if (!userWithBlogs) {
    return next(
      new HttpError("Could not find a blog for the provided user id", 404)
    );
  }

  res.json({
    data: userWithBlogs.blogs.map((blog) => blog.toObject({ getters: true })),
  });
};

const createBlog = async (req, res, next) => {
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, category, address } = req.body;

  let coordinates;
  if (category.toLowerCase() === "travel") {
    try {
      coordinates = await getCoordinates(address);
    } catch (err) {
      return next(err);
    }
  }

  const createdBlog = new BlogsModel({
    title,
    description,
    image:
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    category,
    date: new Date(),
    author: req.userData.userId,
    address: address ? address : undefined,
    coordinates: coordinates ? coordinates : undefined,
  });

  let user;
  try {
    user = await UsersModel.findById(req.userData.userId);
  } catch (err) {
    return next(
      new HttpError("Creating a blog failed, please try again.", 500)
    );
  }

  if (!user) {
    return next(new HttpError("Could not find user for provided id", 404));
  }

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

  if (blog.author.toString() !== req.userData.userId) {
    return next(new HttpError("You are not allowed to edit this blog.", 401));
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

  res.status(200).json({
    blog: blog.toObject({ getters: true }),
    userId: req.userData.userId,
  });
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

  if (blog.author.id !== req.userData.userId) {
    return next(new HttpError("You are not allowed to delete this blog.", 401));
  }

  const imgPath = blog.image;

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

  fs.unlink(imgPath, (err) => {
    console.log(err);
  });

  res.status(200).json({ message: `Deleted Successfully` });
};

exports.getBlogs = getBlogs;
exports.getBlogById = getBlogById;
exports.getBlogsByUserId = getBlogsByUserId;
exports.createBlog = createBlog;
exports.updateBlog = updateBlog;
exports.deleteBlog = deleteBlog;
