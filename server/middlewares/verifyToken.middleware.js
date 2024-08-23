import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(400).json({ msg: "token does not exist" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      return res.status(500).json({ msg: error });
    }
    req.user = user;
    next();
  });
};
