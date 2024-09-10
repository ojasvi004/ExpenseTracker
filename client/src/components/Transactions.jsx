import { RiDeleteBin6Line } from "react-icons/ri";
const Transactions = ({
  _id,
  title,
  amount,
  description,
  category,
  transactionType,
  createdAt,
  onDelete,
}) => {
  return (
    <tr>
      <td>{title}</td>
      <td>${amount.toFixed(2)}</td>
      <td>{category}</td>
      <td>{description}</td>
      <td>{transactionType}</td>
      <td>{new Date(createdAt).toLocaleDateString()}</td>
      <td>
        <button onClick={() => onDelete(_id)} className="delete-btn">
          <RiDeleteBin6Line />
        </button>
      </td>
    </tr>
  );
};

export default Transactions;
