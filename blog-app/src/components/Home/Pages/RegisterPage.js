import React from "react";
import { useState } from "react";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const usernameSetHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordSetHandler = (event) => {
    setPassword(event.target.value);
  };

  async function submitRegister(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-type": "application/json" },
    });
    alert(
      response.status === 200
        ? "Registration Successful"
        : "Registration Failed"
    );
  }

  return (
    <form className="formRegister" onSubmit={submitRegister}>
      <h1>Register</h1>
      <input type="text" placeholder="username" onChange={usernameSetHandler} />
      <input
        type="password"
        placeholder="password"
        onChange={passwordSetHandler}

      />
      <button>Register</button>
    </form>
  );
}

export default RegisterPage;
