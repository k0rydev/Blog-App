import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../adapter/useUser";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { login, register } = useUser();

  const usernameSetHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordSetHandler = (event) => {
    setPassword(event.target.value);
  };

  function registerHandler(event) {
    event.preventDefault();
    register(username, password).then((status) => {
      if (status === 200) {
        login(username, password).then(setRedirect(true));
        // setRedirect(true);
      } else {
        alert(status);
      }
    });
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form className="formRegister" onSubmit={registerHandler}>
      <h1>Register</h1>
      <input type="text" placeholder="username" onChange={usernameSetHandler} />
      <input
        type="password"
        placeholder="password"
        onChange={passwordSetHandler}
      />
      <button style={{ cursor: "pointer" }}>Register</button>
    </form>
  );
}

export default RegisterPage;
