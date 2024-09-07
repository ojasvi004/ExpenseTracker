import { useState, useEffect } from "react";
import axios from "axios";
import Transactions from "../components/Transactions";

const ExpensePage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/transactions")
      .then((response) => {
        setTransactions(response.data.msg); 
        console.log(response.data.msg); 
      })
      .catch((error) => {
        console.log("error fetching the transactions", error);
      });
  }, []);

  return (
    <div>
      {transactions.length > 0 &&
        transactions.map((transaction) => (
          <Transactions key={transaction._id} {...transaction} />
        ))}
    </div>
  );
};

export default ExpensePage;
