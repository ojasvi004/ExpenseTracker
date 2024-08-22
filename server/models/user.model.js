import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "must provide an username"],
      min: 4,
      unique: [true, "username must be unique"],
    },
    password: {
      type: String,
      required: [true, "must provide a password"],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
