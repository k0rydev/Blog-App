import React from "react";
import "./Header.css";

import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        Blog App
      </Link>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
}

export default Header;
