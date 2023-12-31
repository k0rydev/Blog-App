import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../components/Editor";
import { useCreatePost } from "../adapter/useCreatePost";

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { createPost } = useCreatePost();
  const [isLoading, setIsLoading] = useState(false);

  async function submitPost(event) {
    event.preventDefault();
    createPost(title, summary, content, files).then((status) => {
      if (status === 200) {
        setRedirect(true);
      }
      setIsLoading(true);
    });
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
      <Editor value={content} onChange={contentSetHandler} />
      {!isLoading ? (
        <button style={{ marginTop: "5px", cursor: "pointer" }}>
          Create Post
        </button>
      ) : (
        <button style={{ marginTop: "5px", cursor: "pointer" }}>Loading</button>
      )}
    </form>
  );
}

export default CreatePostPage;
