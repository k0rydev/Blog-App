import React from "react";

function RegisterPage() {
  return (
    <form className="formRegister" action="">
      <h1>Register</h1>
      <input type="text" placeholder="username" />
      <input type="password" placeholder="password" />
      <button>Register</button>
    </form>
  );
}

export default RegisterPage;
