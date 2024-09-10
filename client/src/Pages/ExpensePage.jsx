import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Transactions from "../components/Transactions";
import UserContext from "../context/UserContext";
import ExpenseChart from "../components/ExpenseChart";

const ExpensePage = () => {
  const [transactions, setTransactions] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = () => {
    axios
      .get("http://localhost:3000/api/v1/transactions", {
        withCredentials: true,
      })
      .then((response) => {
        setTransactions(response.data.msg);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTransaction = (id) => {
    axios
      .delete(`http://localhost:3000/api/v1/transactions/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        setTransactions(transactions.filter((t) => t._id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const calculateTotalExpenditure = () => {
    return transactions
      .filter((transaction) => transaction.transactionType === "Expense")
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  const totalExpenditure = calculateTotalExpenditure();

  return (
    <div>
      <h2>Total Expenditure: ${totalExpenditure.toFixed(2)}</h2>
      <div className="expense">
        {user ? (
          <>
            {transactions.length > 0 ? (
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <Transactions
                      key={transaction._id}
                      {...transaction}
                      onDelete={deleteTransaction}
                    />
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No transactions found</p>
            )}
          </>
        ) : (
          <p>Log in to view transactions</p>
        )}
        <ExpenseChart transactions={transactions} />
      </div>
    </div>
  );
};

export default ExpensePage;
