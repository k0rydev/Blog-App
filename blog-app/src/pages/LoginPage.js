import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../adapter/useUser";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { login } = useUser();

  const usernameSetHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordSetHandler = (event) => {
    setPassword(event.target.value);
  };

  const loginHandler = (event) => {
    event.preventDefault();
    login(username, password).then((status) => {
      if (status === 200) setRedirect(true);
    });
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form className="formLogin" onSubmit={loginHandler}>
      <h1>Login</h1>
      <input type="text" placeholder="username" onChange={usernameSetHandler} />
      <input
        type="password"
        placeholder="password"
        onChange={passwordSetHandler}
      />
      <button style={{ cursor: "pointer" }}>Login</button>
    </form>
  );
}

export default LoginPage;
