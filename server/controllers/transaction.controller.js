import { Transaction } from "../models/transaction.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addTransaction = asyncHandler(async (req, res) => {
  const { title, amount, category, description, userId, transactionType } =
    req.body;
  if (!title || !amount || !description || !category || !transactionType) {
    return res.status(400).json({ msg: "fill all fields" });
  }
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ msg: "user doesn't exist" });
  }

  await Transaction.create({
    title,
    amount,
    category,
    description,
    user: userId,
    transactionType,
  });
  return res.status(200).json({ msg: "transaction added successfully" });
});

export const showAllTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({});
  return res.status(200).json({ msg: transactions });
});

export const deleteTransaction = asyncHandler(async (req, res) => {
  const transactionId = req.params.id;
  const transactionElement = await Transaction.findByIdAndDelete(transactionId);
  if (!transactionElement) {
    return res.status(404).json({ msg: "transaction not found" });
  }
  res.status(200).json({ msg: "deleted successfully" });
});

export const updateTransaction = asyncHandler(async (req, res) => {
  const transactionId = req.params.id;
  const { title, amount, category, description, transactionType } = req.body;

  const transaction = await Transaction.findById(transactionId);
  if (!transaction) {
    return res.status(404).json({ msg: "transaction not found" });
  }

  transaction.title = title;
  transaction.amount = amount;
  transaction.category = category;
  transaction.description = description;
  transaction.transactionType = transactionType;

  await transaction.save();

  res.status(200).json(transaction);
});
