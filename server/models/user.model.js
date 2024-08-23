import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "must provide a username"],
      minlength: 4,
      unique: true,
    },
    password: {
      type: String,
      minlength: 4,
      required: [true, "must provide a password"],
    },
    budget: {
      type: Number,
      required: true,
      default: 10000,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
