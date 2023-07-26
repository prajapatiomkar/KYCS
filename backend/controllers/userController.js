import asyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import credentialModel from "../models/credentialModel.js";

// @desc   Auth user / Set token
// @route  Post /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Please enter all fields" });
  }

  const user = await userModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

// @desc   Register a new user
// @route  Post /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await userModel.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
  }

  const user = await userModel.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

// @desc   Logout
// @route  Post /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "User logged out successfully" });
});

// @desc   Get user profile
// @route  GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  try {
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
});

// @desc   Update user profile
// @route  PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

//Credentials

// @desc Create a save encrypted Credential
// @route POST /api/users/credentials
// @access Private

// {name: 'omkar', email: 'test@gmail.com', url: 'https://www.youtube.com/', password: 'omkar', description: 'omkar'}
const createCredential = asyncHandler(async (req, res) => {
  const { userid, title, email, password, url, description } = req.body;
  const credential = {
    userid,
    title,
    email,
    password,
    url,
    description,
  };
  const newCredential = await credentialModel.create(credential);
  if (newCredential) {
    res.status(201).json({ message: "Credential created successfully" });
  } else {
    res.status(400).json({ message: "Error Occured" });
  }
});

const getCredentials = asyncHandler(async (req, res) => {
  const credentials = await credentialModel.find({
    userid: Object(req.params.userid),
  });
  if (credentials) {
    res.status(200).json(credentials);
  } else {
    res.status(404).json({ message: "Credentials not found getCredential" });
  }
});

const getCredentialById = asyncHandler(async (req, res) => {
  const credential = await credentialModel.findById(req.params.id);
  if (credential) {
    res.status(200).json(credential);
  } else {
    res.status(404).json({ message: "Credential not found" });
  }
});

const deleteCredential = asyncHandler(async (req, res) => {
  const result = await credentialModel.findByIdAndDelete(req.params.id);
  if (result) {
    res.status(200).json({ result });
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  createCredential,
  getCredentials,
  getCredentialById,
  deleteCredential,
};
