import React from "react";

function LoginPage() {
  return (
    <form className="formLogin" action="">
      <h1>Login</h1>
      <input type="text" placeholder="username" />
      <input type="password" placeholder="password" />
      <button>Login</button>
    </form>
  );
}

export default LoginPage;
