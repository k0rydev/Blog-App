import React, { useState } from "react";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const setUsernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const setPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  async function submitRegisterHandler(event) {
    event.preventDefault();
    await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    return false;
  }

  return (
    <form className="formRegister" onSubmit={submitRegisterHandler}>
      <h1>Register</h1>
      <input type="text" placeholder="username" onChange={setUsernameHandler} />
      <input
        type="password"
        placeholder="password"
        onChange={setPasswordHandler}
      />
      <button>Register</button>
    </form>
  );
}

export default RegisterPage;
