import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const checkUsername = await User.findOne({ username });
    if (checkUsername) {
      return res.status(400).json({ msg: "username already exists" });
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
