import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Transactions from "../components/Transactions";
import UserContext from "../context/UserContext";

const ExpensePage = () => {
  const [transactions, setTransactions] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:3000/api/v1/transactions", {
          withCredentials: true,
        })
        .then((response) => {
          setTransactions(response.data.msg);
          console.log(response.data);
          console.log(transactions);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  return (
    <div>
      {user ? (
        <div>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <Transactions key={transaction._id} {...transaction} />
            ))
          ) : (
            <p>no transactions found</p>
          )}
        </div>
      ) : (
        <p>log in to view transactions</p>
      )}
    </div>
  );
};

export default ExpensePage;
