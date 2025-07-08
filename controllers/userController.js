import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = "something";

// ✅ Register User
const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedpwd = await bcrypt.hash(password, 10);

    const user = {
      firstname,
      lastname,
      email,
      password: hashedpwd,
    };

    const result = await userModel.create(user);
    res.status(201).json({ message: "Registration successful", user: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ✅ Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const userObj = {
      firstname: existingUser.firstname,
      lastname: existingUser.lastname,
      email: existingUser.email,
      role: existingUser.role,
    };

    const token = jwt.sign(userObj, SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", user: userObj, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ✅ Get All Users
const showUsers = async (req, res) => {
  try {
    const result = await userModel.find();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ✅ Get Profile by ID
const profile = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userModel.findById(id);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

// ✅ Delete User by ID
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userModel.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully", result });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

// ✅ Update User by ID
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const result = await userModel.findByIdAndUpdate(id, body, { new: true });
    res.status(200).json({ message: "User updated successfully", result });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

export { register, login, showUsers, deleteUser, updateUser, profile };
