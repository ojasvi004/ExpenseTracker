import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <Link to="/expenses">Expense Tracker </Link>
      <Link to="/register">Register</Link>
    </header>
  );
};

export default Header;
