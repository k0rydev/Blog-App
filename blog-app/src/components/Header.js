import React, { useEffect, useContext } from "react";
import "../styles/Header.css";
import { UserContext } from "../context/UserContext";

import { Link } from "react-router-dom";

function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

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
            <div onClick={logout} style={{ cursor: "pointer" }}>
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
