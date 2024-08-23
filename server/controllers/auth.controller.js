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

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ msg: "user not found" });

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ msg: "invalid password" });

    const payload = { username, id: user._id };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });

    user.refreshToken = refreshToken;
    await user.save();

    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
      })
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
      });

    return res.status(200).json({ msg: "login successful" });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
}
export async function refreshToken(req, res) {
  const { refresh_token } = req.cookies;

  if (!refresh_token) {
    return res.status(400).json({ msg: "refresh token doesn't exist" });
  }
  try {
    const token = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
    const user = User.findOne({ username });

    if (!user || user.refreshToken !== refresh_token) {
      return res.status(402).json({ msg: "invalid refresh token" });
    }

    const payload = { username: token.username, id: token.id };

    const newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });

    const newRefreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );

    user.refreshToken = newRefreshToken;
    await user.save();

    res
      .cookie("access_token", newAccessToken, {
        httpOnly: true,
      })
      .cookie("refresh_token", newRefreshToken, {
        httpOnly: true,
      });

    return res
      .status(200)
      .json({ msg: "tokens refreshed successfully woohoo!" });
  } catch (error) {
    return res.status(403).json({ msg: error });
  }
}

export const logout = async (req, res) => {
  try {
    res
      .cookie("access_token", "", { httpOnly: true })
      .json({ msg: "logout successful" });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
