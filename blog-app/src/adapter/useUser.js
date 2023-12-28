import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

export function useUser() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  const login = async (username, password) => {
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
        });
        break;
      case 400:
        alert("Wrong Credentials. Username not exists or wrong password.");
        break;
      case 401:
        alert("Username and Password can not be empty");
        break;
      default:
        alert("Unkown error! Please report back to devs");
    }
    return response.status;
  };

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const register = async (username, password) => {
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
  };

  return {
    userInfo,
    login,
    logout,
    register,
  };
}
