const Transactions = ({
  title,
  amount,
  description,
  category,
  transactionType,
  createdAt,
}) => {
  return (
    <>
      <h2>{title}</h2>
      <p>Amount: ${amount}</p>
      <p>Category: {category}</p>
      <p>Description: {description}</p>
      <p>Type: {transactionType}</p>
      <p>Created At: {new Date(createdAt).toLocaleDateString()}</p>
    </>
  );
};

export default Transactions;
