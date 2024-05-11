const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

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

  const createdUser = new UserModel({
    name,
    email,
    password,
    blogs: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError("Signing up failed, please try again", 500));
  }

  res.status(200).json({ user: createdUser.toObject({ getters: true }) });
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

  if (!registeredUser || registeredUser.password !== password) {
    return next(
      new HttpError("Invalid credentials, could not log you in.", 401)
    );
  }

  res.json({ message: "Login Successfully" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
