import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "incorrect username" });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(400).json({ msg: "password incorrect" });
    }

    const payload = { username, id: user._id };

    jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, (error, token) => {
      if (error) {
        return res.status(500).json({ msg: error });
      }
      res.cookie("access_token", token, {
        httpOnly: true,
      });
      res.status(200).json({ msg: "login successful" });
    });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
