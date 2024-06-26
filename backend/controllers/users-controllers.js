const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/users");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await UserModel.find({}, "-password");
  } catch (err) {
    return next(
      new HttpError("Fetching user failed, please try again later.", 500)
    );
  }

  res.json({ users: users.map((user) => user.toObject({ getter: true })) });
};

const getUserById = async (req, res, next) => {
  const userId = req.params.id;
  let user;
  try {
    user = await UserModel.findById(userId);
  } catch (err) {
    return next(
      new HttpError("Fetching user failed, please try again later.", 500)
    );
  }

  res.json({ userName: user.name });
};

const signup = async (req, res, next) => {
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, email, password } = req.body;

  let registeredUser;
  try {
    registeredUser = await UserModel.findOne({ email: email });
  } catch (err) {
    return next(
      new HttpError("Signing up failed, please try again later.", 500)
    );
  }

  if (registeredUser) {
    return next(new HttpError("User exists already, please login.", 422));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError("Could not create user, please try again.", 500));
  }

  const createdUser = new UserModel({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError("Signing up failed, please try again", 500));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY,
      { expiresIn: "2h" }
    );
  } catch (err) {
    return next(new HttpError("Signing up failed, please try again", 500));
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let registeredUser;
  try {
    registeredUser = await UserModel.findOne({ email: email });
  } catch (err) {
    return next(
      new HttpError("Logging in failed, please try again later.", 500)
    );
  }

  if (!registeredUser) {
    return next(
      new HttpError("Invalid credentials, could not log you in.", 401)
    );
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, registeredUser.password);
  } catch {
    return next(
      new HttpError(
        "Could not log you in, please check you credentials and try again.",
        500
      )
    );
  }

  if (!isValidPassword) {
    return next(
      new HttpError("Invalid credentials, could not log you in.", 401)
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: registeredUser.id, email: registeredUser.email },
      process.env.JWT_KEY,
      { expiresIn: "2h" }
    );
  } catch (err) {
    return next(
      new HttpError("Logging in failed, please try again later.", 500)
    );
  }

  res.json({
    userId: registeredUser.id,
    email: registeredUser.email,
    token: token,
  });
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.signup = signup;
exports.login = login;
