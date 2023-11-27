import React from "react";

import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <a href="" className="logo">
        Blog App
      </a>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="">Register</Link>
      </nav>
    </header>
  );
}

export default Header;
