import React, { useEffect, useState } from "react";
import "./Header.css";

import { Link } from "react-router-dom";

function Header() {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUsername(userInfo.username);
      });
    });
  }, []);
  return (
    <header>
      <Link to="/" className="logo">
        Blog App
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create Post</Link>
            <a>Logout</a>
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
