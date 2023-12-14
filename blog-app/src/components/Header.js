import { Link } from "react-router-dom";
import { useUser } from "../adapter/useUser";

import { Navigate } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  const { userInfo, logout } = useUser();

  const logoutHandler = () => {
    logout();
  };

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        Blog App
      </Link>
      <nav>
        {username && (
          <>
            <div>{username}</div>
            <Link to="/create">Create Post</Link>
            <div onClick={logoutHandler} style={{ cursor: "pointer" }}>
              Logout
            </div>
          </>
        )}

        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
