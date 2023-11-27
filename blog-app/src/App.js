import "./App.css";
import { Route, Routes } from "react-router-dom";

import IndexPage from "./components/Home/Pages/IndexPage";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path={"/login"} element={<div>Login Page</div>} />
        <Route path={"/register"} element={<div>Register Page</div>} />
      </Route>
    </Routes>
  );
}

export default App;
