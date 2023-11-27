import "./App.css";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Home/Header";
import Post from "./components/Home/Post";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route index element={<Post />} />
        <Route path={"/login"} element={<div>Login</div>} />
        <Route path={"/register"} element={<div>Register</div>} />
      </Route>
    </Routes>
  );
}

export default App;
