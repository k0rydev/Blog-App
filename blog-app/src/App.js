import "./App.css";
<<<<<<< Updated upstream

function App() {
  return (
    <main>
      <header>
        <a href="" className="logo">
          Blog App
        </a>
        <nav>
          <a href="">Login</a>
          <a href="">Register</a>
        </nav>
      </header>
      <div className="post">
        <div className="image">
          <img src="https://sa.kapamilya.com/absnews/abscbnnews/media/2023/life/11/23/20231123-esports.jpg" />
        </div>
        <div className="text">
          <h2>
            T1 nắc Weibo Gaming cực căng 3 - 0 tại CKTG Liên Minh Huyền Thoại
          </h2>
          <p className="info">
            <a className="author">Kory the Korgy</a>
            <time>2023-01-06 16:45</time>
          </p>
          <p className="summary">
            T1 đã giành chiến thắng 3-0 trước WBG và trở thành nhà vô địch CKTG
            2023. Đây cũng là chức vô địch CKTG thứ 4 của T1 và cá nhân Faker.
          </p>
        </div>
      </div>
      <div className="post">
        <div className="image">
          <img src="https://sa.kapamilya.com/absnews/abscbnnews/media/2023/life/11/23/20231123-esports.jpg" />
        </div>
        <div className="text">
          <h2>
            T1 nắc Weibo Gaming cực căng 3 - 0 tại CKTG Liên Minh Huyền Thoại
          </h2>
          <p className="info">
            <a className="author">Kory the Korgy</a>
            <time>2023-01-06 16:45</time>
          </p>
          <p className="summary">
            T1 đã giành chiến thắng 3-0 trước WBG và trở thành nhà vô địch CKTG
            2023. Đây cũng là chức vô địch CKTG thứ 4 của T1 và cá nhân Faker.
          </p>
        </div>
      </div>
      <div className="post">
        <div className="image">
          <img src="https://sa.kapamilya.com/absnews/abscbnnews/media/2023/life/11/23/20231123-esports.jpg" />
        </div>
        <div className="text">
          <h2>
            T1 nắc Weibo Gaming cực căng 3 - 0 tại CKTG Liên Minh Huyền Thoại
          </h2>
          <p className="info">
            <a className="author">Kory the Korgy</a>
            <time>2023-01-06 16:45</time>
          </p>
          <p className="summary">
            T1 đã giành chiến thắng 3-0 trước WBG và trở thành nhà vô địch CKTG
            2023. Đây cũng là chức vô địch CKTG thứ 4 của T1 và cá nhân Faker.
          </p>
        </div>
      </div>
    </main>
=======
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
>>>>>>> Stashed changes
  );
}

export default App;
