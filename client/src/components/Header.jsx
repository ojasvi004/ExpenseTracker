import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from "axios";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post(
        "http://localhost:3000/api/v1/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error (error);
    }
  };

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
            <a href="/" onClick={logout}>
              Logout
            </a>
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
