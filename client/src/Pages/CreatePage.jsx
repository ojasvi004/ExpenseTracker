import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

export const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [category, setCategory] = useState("");
  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !amount || !description || !transactionType || !category) {
      alert("all fields are required");
      return;
    }

    const data = {
      title,
      amount,
      description,
      category,
      transactionType,
      userId: user.id,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/transactions",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("transaction created successfully");
      }
    } catch (error) {
      alert("failed to create transaction");
      console.log(error);
    }
  };

  return (
    <>
      <h2>Create Expense</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Transaction Type"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
