import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseChart = ({ transactions }) => {
  const expenseData = transactions
    .filter((transaction) => transaction.transactionType === "Expense")
    .reduce((acc, transaction) => {
      const date = new Date(transaction.createdAt).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += transaction.amount;
      return acc;
    }, {});

  const labels = Object.keys(expenseData);
  const data = Object.values(expenseData);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Expenses",
        data,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div className="chart" style={{ width: "500px", height: "300px" }}>
      <h3>Expenses over Time</h3>
      <Line data={chartData} width={300} height={200} />
    </div>
  );
};

export default ExpenseChart;
