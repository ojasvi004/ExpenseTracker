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
      alert("All fields are required");
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
        setTitle("");
        setAmount("");
        setDescription("");
        setCategory("");
        setTransactionType("");
      }
    } catch (error) {
      alert("failed to create transaction");
      console.log(error);
    }
  };

  return (
    <>
      {user ? (
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
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">select category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Education">Education</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Others">Others</option>
            </select>
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <option value="">Select Transaction Type</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        <p>login to create transactions</p>
      )}
    </>
  );
};

export default CreatePage;
