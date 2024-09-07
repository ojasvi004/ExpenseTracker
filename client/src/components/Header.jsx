import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { IoIosAddCircleOutline } from "react-icons/io";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header>
      <Link to="/expenses" className="header-link">
        Expense Tracker
      </Link>
      <nav>
        {user ? (
          <>
            <Link to="/create" className="post-btn">
              <IoIosAddCircleOutline />
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="auth-link">
              Login
            </Link>
            <Link to="/register" className="auth-link">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
