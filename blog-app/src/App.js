import "./App.css";
import { Route, Routes } from "react-router-dom";

import IndexPage from "./pages/IndexPage";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePostPage from "./pages/CreatePostPage";
import PostPage from "./pages/PostPage";
import EditPostPage from "./pages/EditPostPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/register"} element={<RegisterPage />} />
        <Route path={"/create"} element={<CreatePostPage />} />
        <Route path={"/post/:id"} element={<PostPage />} />
        <Route path={"/edit/:id"} element={<EditPostPage />} />
      </Route>
    </Routes>
  );
}

export default App;
