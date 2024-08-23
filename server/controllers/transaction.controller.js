import { Transaction } from "../models/transaction.model.js";
import { User } from "../models/user.model.js";

export const addTransaction = async (req, res) => {
  const { title, amount, category, description, userId, transactionType } =
    req.body;
  try {
    if (!title || !amount || !description || !category || !transactionType) {
      return res.status(401).json({ msg: "fill all fields" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(402).json({ msg: "user doesn't exist" });
    }

    const response = await Transaction.create({
      title: title,
      amount: amount,
      category: category,
      description: description,
      user: userId,
      transactionType: transactionType,
    });
    return res.status(200).json({ msg: "transaction added successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export const showAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({});
    return res.status(200).json({ msg: transactions });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    // const userId = req.body.userId;

    // const user = await User.findById(userId);
    // if (!user) {
    //   return res.status(400).json({ msg: "user doesn't exist" });
    // }
    const transactionElement = await Transaction.findByIdAndDelete(transactionId);
    if (!transactionElement) {
      return res.status(401).json({ msg: "transaction not found" });
    }
    res.status(200).json({ msg: "deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
