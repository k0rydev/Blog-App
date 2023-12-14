import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../components/Editor";
import { useCreatePost } from "../adapter/useCreatePost";

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const { createPost, isCreated } = useCreatePost();

  async function submitPost(event) {
    event.preventDefault();
    createPost(title, summary, content, files);
  }

  const titleSetHandler = (event) => {
    setTitle(event.target.value);
  };

  const summarySetHandler = (event) => {
    setSummary(event.target.value);
  };

  const contentSetHandler = (event) => {
    setContent(event);
  };

  const fileSetHandler = (event) => {
    setFiles(event.target.files);
  };
  if (isCreated) {
    return <Navigate to={"/"} />;
  }

  return (
    <form onSubmit={submitPost}>
      <input type="text" placeholder="Title" onChange={titleSetHandler} />
      <input type="text" placeholder="Summary" onChange={summarySetHandler} />
      <input type="file" onChange={fileSetHandler} />
      <Editor value={content} onChange={contentSetHandler} />
      <button style={{ marginTop: "5px" }}>Create Post</button>
    </form>
  );
}

export default CreatePostPage;
