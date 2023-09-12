import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const getAllUsers = async (req, res) => {};

///////////////////////////////////////////////
// Registration function
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // finding user
  let user = await User.findOne({ email });

  // if exists
  if (user)
    return res.status(404).json({
      success: false,
      message: "User already exists",
    });

  // else if not exists - create one

  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, password: hashedPassword });

  // conforming registration
  sendCookie(user, res, "Registration successful", 201);
};

///////////////////////////////////////////////
// Login function
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  // finding user
  const user = await User.findOne({ email }).select("+password"); // we have set select as false in the schema so need to do in manually

  // if user doesn't exists
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Invalid Email or password",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  // if password doesn't match
  if (!isMatch) {
    return res.status(404).json({
      success: false,
      message: "Invalid Email or password",
    });
  }

  // id password got match
  sendCookie(user, res, `Welcome back, ${user.name}`, 200);
};

///////////////////////////////////////
export const getMyProfile = async (req, res) => {
  // const id = "myid";

  res.status(200).json({
    success: true,
    user: req.user,
  });
};

/////////////////////////////////////////
export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};
