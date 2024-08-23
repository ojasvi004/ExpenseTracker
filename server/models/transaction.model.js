import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
      default: 0,
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    transactionType: {
      type: String,
      required: [true, "Transaction Type is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
