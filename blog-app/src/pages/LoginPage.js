import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const usernameSetHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordSetHandler = (event) => {
    setPassword(event.target.value);
  };

  async function submitLogin(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });
    switch (response.status) {
      case 200:
        response.json().then((userInfo) => {
          setUserInfo(userInfo);
          setRedirect(true);
        });
        break;
      case 400:
        alert("Login Failed");
        break;
      case 401:
        alert("Username and Password can not be empty");
        break;
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form className="formLogin" onSubmit={submitLogin}>
      <h1>Login</h1>
      <input type="text" placeholder="username" onChange={usernameSetHandler} />
      <input
        type="password"
        placeholder="password"
        onChange={passwordSetHandler}
      />
      <button>Login</button>
    </form>
  );
}

export default LoginPage;
