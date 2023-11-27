import "./App.css";
import { Route, Routes } from "react-router-dom";

import Header from "./components/home/Header";
import Post from "./components/home/Post";

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
