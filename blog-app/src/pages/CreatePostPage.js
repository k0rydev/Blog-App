import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../components/Editor";

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function submitPost(event) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files?.[0]);
    event.preventDefault();
    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
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
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form onSubmit={submitPost}>
      <input type="text" placeholder="Title" onChange={titleSetHandler} />
      <input type="text" placeholder="Summary" onChange={summarySetHandler} />
      <input type="file" onChange={fileSetHandler} />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: "5px" }}>Create Post</button>
    </form>
  );
}

export default CreatePostPage;
