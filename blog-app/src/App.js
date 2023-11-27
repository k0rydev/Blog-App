import "./App.css";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Home/Header";
import Post from "./components/Home/Post";

function App() {
  return (
    <Routes>
      <Route
        index
        element={
          <main>
            <Header />
            <Post />
            <Post />
            <Post />
          </main>
        }
      />
      <Route path={"/login"} element={<div>Login</div>} />
    </Routes>
  );
}

export default App;
